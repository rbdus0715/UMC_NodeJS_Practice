import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../commons/api-response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 이미 응답이 전송된 경우 기본 Express 에러 핸들러로 전달
  if (res.headersSent) {
    return next(err);
  }

  // 에러 메시지와 상태 코드 설정
  const message = err.message || '서버 내부 오류가 발생했습니다.';
  const statusCode = (err as any).statusCode || (err as any).status || 500;

  // ApiResponse를 사용하여 JSON 응답 생성
  const errorResponse = ApiResponse.error(message, statusCode);

  // JSON 형태로 응답
  res.status(statusCode).json(errorResponse);
};

