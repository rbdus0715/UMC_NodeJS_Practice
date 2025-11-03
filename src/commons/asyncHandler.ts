import { NextFunction, Request, Response } from 'express';
import { IContext } from './interfaces/context.interface';

const asyncHandler = (fn: (context: IContext) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn({ req, res, next }).catch(next);
  };
};

export default asyncHandler;
