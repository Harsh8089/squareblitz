import { Response } from "express";
import { StatusCode } from "@repo/types/statusCode";

export class ResponseService {
  static success(
    res: Response, 
    status: StatusCode = 200, 
    data = {}, 
    message: string
  ) {
    res.status(status).json({
      success: true,
      message,
      data
    })
  }

  static error(
    res: Response, 
    status: StatusCode, 
    message: string, 
    error = null
  ) {
    return res.status(status).json({
      success: false,
      message,
      error
    });
  }
}