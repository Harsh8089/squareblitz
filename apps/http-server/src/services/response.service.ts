import { StatusCode } from '@repo/types/statusCode';
import { Response } from 'express';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
}

export class ResponseService {
  static success<T>(
    res: Response,
    status: StatusCode = 200,
    data: T,
    message: string,
  ) {
    res.status(status).json({
      success: true,
      message,
      data,
    } as ApiResponse<T>);
    return;
  }

  static error(
    res: Response,
    status: StatusCode,
    message: string,
    error: any = null,
  ) {
    res.status(status).json({
      success: false,
      message,
      error,
    });
    return;
  }
}
