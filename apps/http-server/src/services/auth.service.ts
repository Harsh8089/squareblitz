import { JwtPayload } from '../middleware/token.middleware.js';
import { ResponseService } from './response.service.js';
import { Request, Response } from 'express';
import { users } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
  private generateToken(username: string) {
    const accessToken = jwt.sign(
      {
        username,
        type: 'access',
      } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      {
        username,
        type: 'refresh',
      } as JwtPayload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return ResponseService.error(res, 400, 'Missing username/password');
    }
    try {
      const userDb = users.filter((user) => user.username === username)?.at(0);
      if (userDb) {
        return ResponseService.error(res, 409, 'Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
      users.push({
        username,
        password: hashedPassword,
      });

      return ResponseService.success(res, 200, {}, 'Register successful');
    } catch (error) {
      return ResponseService.error(res, 500, '', error as any);
    }
  }

  async signIn(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return ResponseService.error(
        res,
        400,
        'Missing username/email or password',
      );
    }

    try {
      const userDb = users
        .filter((user) => user.username === username || user.email === email)
        ?.at(0);
      if (!userDb) {
        return ResponseService.error(res, 401, 'Invalid username or password');
      }

      const isPasswordMatch = await bcrypt.compare(password, userDb.password);
      if (!isPasswordMatch) {
        return ResponseService.error(res, 401, 'Invalid username or password');
      }

      const { accessToken, refreshToken } = this.generateToken(username);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return ResponseService.success(
        res,
        200,
        {
          accessToken,
          user: {
            username: userDb?.username,
          },
        },
        'Login successful',
      );
    } catch (error) {
      return ResponseService.error(res, 500, '', error as any);
    }
  }

  async logout(_: Request, res: Response) {
    try {
      res.clearCookie('refreshToken');
      return ResponseService.success(res, 200, {}, '');
    } catch (error) {
      return ResponseService.error(res, 500, '', error as any);
    }
  }

  async generateAccessToken(req: Request, res: Response) {
    try {
      const username = (req as any).user;

      const accessToken = jwt.sign(
        {
          username,
          type: 'access',
        },
        process.env.JWT_SECRET as string,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
      );

      return ResponseService.success(res, 200, { accessToken }, '');
    } catch (error) {
      return ResponseService.error(res, 500, 'Token refersh failed');
    }
  }
}

const SALT_LENGTH = 10;
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';
