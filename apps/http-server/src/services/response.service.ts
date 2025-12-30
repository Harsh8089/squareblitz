import { StatusCode } from '@repo/types/statusCode';
import { Response } from 'express';

export class ResponseService {
  static success(
    res: Response,
    status: StatusCode = 200,
    data = {},
    message: string,
  ) {
    res.status(status).json({
      success: true,
      message,
      data,
    });
    return;
  }

  static error(
    res: Response,
    status: StatusCode,
    message: string,
    error = null,
  ) {
    res.status(status).json({
      success: false,
      message,
      error,
    });
    return;
  }
}
