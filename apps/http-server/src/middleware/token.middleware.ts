import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppError, UnauthorizedError } from '../utils/errorHandler.utils.js';

dotenv.config();

export type JwtPayload = {
  username: string;
  type: 'access' | 'refresh';
};

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AppError(RESPONSE_MESSAGE.TOKEN_NOT_FOUND);
  }

  if(!process.env.JWT_SECRET) {
    throw new AppError(RESPONSE_MESSAGE.SERVER_CONF_ERROR);
  }

  // decode accessToken
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  if (decoded.type !== 'access') {
    throw new UnauthorizedError(RESPONSE_MESSAGE.INVALID_TOKEN_TYPE);
  }

  req.user = decoded.username;

  next();
};

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(RESPONSE_MESSAGE.TOKEN_NOT_FOUND);
    }

    if(!process.env.JWT_REFRESH_SECRET) {
      throw new AppError(RESPONSE_MESSAGE.SERVER_CONF_ERROR);
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedError(RESPONSE_MESSAGE.INVALID_TOKEN_TYPE);
    }

    req.user = decoded.username;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(RESPONSE_MESSAGE.REFRESH_TOKEN_EXPIRED);
    }
  } finally {
    next();
  }
};

enum RESPONSE_MESSAGE {
  SERVER_CONF_ERROR = "Server configuration error",
  INVALID_TOKEN = "Invalid token",
  INVALID_TOKEN_TYPE = "Invalid token type",
  TOKEN_NOT_FOUND = "Token not found",
  REFRESH_TOKEN_EXPIRED = "Refresh token has expired"
}