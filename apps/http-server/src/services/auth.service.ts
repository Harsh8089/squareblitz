import { JwtPayload } from '../middleware/token.middleware.js';
import { ResponseService } from './response.service.js';
import { Request, Response } from 'express';
import { users } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AppError, BadRequestError, UnauthorizedError } from '../utils/errorHandler.utils.js';

dotenv.config();

export class AuthService {
  private generateToken(username: string) {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      throw new AppError(RESPONSE_MESSAGE.SERVER_CONF_ERROR);
    }

    const accessToken = jwt.sign(
      { username, type: 'access' } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      { username, type: 'refresh' } as JwtPayload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    return { accessToken, refreshToken };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
  }

  signUp = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if(!password || (!username && !email)) {
      throw new BadRequestError(RESPONSE_MESSAGE.MISSING_CREDS);
    }
  
    const existingUser = users.find(
      (user) => user.username === username || user.email === email
    );
    
    if(existingUser) {
      throw new AppError(RESPONSE_MESSAGE.USER_ALREADY_EXISTS, 409);
    }
  
    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password: hashedPassword,
      joined: Date.now(),
      stats: {
        gamesStarted: 0,
        gamesCompleted: 0,
        totalPlayingTime: 0,
      },
      bestRecords: {
        '15': null,
        '30': null,
        '45': null,
        '60': null,
      },
    };
  
    users.push(newUser);
  
    return ResponseService.success(
      res,
      201,
      { username: newUser.username },
      RESPONSE_MESSAGE.REGISTER_SUCCESS
    );
  }

  signIn = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if(!password || (!username && !email)) {
      throw new BadRequestError(RESPONSE_MESSAGE.MISSING_CREDS);
    }

    const user = users.find(
      (u) => u.username === username || u.email === email
    );

    if (!user) {
      throw new UnauthorizedError(RESPONSE_MESSAGE.INVALID_CREDS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError(RESPONSE_MESSAGE.INVALID_CREDS);
    }

    const { accessToken, refreshToken } = this.generateToken(user.username);

    if(!accessToken || !refreshToken) {
      throw new AppError();
    }

    this.setRefreshTokenCookie(res, refreshToken);

    return ResponseService.success(
      res,
      200,
      {
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      RESPONSE_MESSAGE.LOGIN_SUCCESS
    );
  }

  logout = async (_req: Request, res: Response) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return ResponseService.success(
      res,
      200,
      {},
      RESPONSE_MESSAGE.LOGOUT_SUCCESS
    );
  };

  generateAccessToken = async(req: Request, res: Response) => {
      const username = req.user;

      if (!username) {
        throw new UnauthorizedError(RESPONSE_MESSAGE.INVALID_CREDS);
      }

      if (!process.env.JWT_SECRET) {
        throw new AppError(RESPONSE_MESSAGE.SERVER_CONF_ERROR);
      }

      const accessToken = jwt.sign(
        {
          username,
          type: 'access',
        },
        process.env.JWT_SECRET as string,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
      );

      return ResponseService.success(
        res, 
        200, 
        { accessToken }, 
        RESPONSE_MESSAGE.TOKEN_GENERATED
      );
  }
}

const SALT_LENGTH = 10;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const enum RESPONSE_MESSAGE {
  MISSING_CREDS = 'Missing Username/Email/Password',
  USER_ALREADY_EXISTS = 'Username/Email already exists',
  INVALID_CREDS = 'Invalid username or password',
  REGISTER_SUCCESS = 'User registered successfully',
  LOGIN_SUCCESS = 'Login successful',
  LOGOUT_SUCCESS = 'Logged out successfully',
  TOKEN_ERROR = 'Token refresh failed',
  TOKEN_GENERATED = 'Access token generated',
  SERVER_CONF_ERROR = "Server configuration error",
}
