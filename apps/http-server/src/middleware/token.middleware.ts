import { ResponseService } from '../services/response.service.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type JwtPayload = {
  username: string;
  type: 'access' | 'refresh';
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return ResponseService.error(res, 401, 'Access token is required');
    }

    // decode accessToken
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    if (decoded.type !== 'access') {
      return ResponseService.error(res, 401, 'Invalid token type');
    }

    (req as any).user = decoded.username;

    next();
  } catch (error) {
    return ResponseService.error(res, 500, '', error as any);
  }
};

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return ResponseService.error(res, 401, 'Refresh token not found');
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload;

    if (decoded.type !== 'refresh') {
      return ResponseService.error(res, 403, 'Invalid token type');
    }

    (req as any).user = decoded.username;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return ResponseService.error(res, 401, 'Refresh token has expired');
    }
    return ResponseService.error(res, 403, 'Invalid refresh token');
  }
};
