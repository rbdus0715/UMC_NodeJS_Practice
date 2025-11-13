// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../commons/apiResponse';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // 개발용 로그

  const statusCode = err.statusCode || 500; // 에러에 statusCode가 있으면 사용, 없으면 500
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(ApiResponse.error(message));
}
