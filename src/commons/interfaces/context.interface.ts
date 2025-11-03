import { NextFunction, Request, Response } from 'express';

export interface IContext {
  req: Request;
  res: Response;
  next: NextFunction;
}
