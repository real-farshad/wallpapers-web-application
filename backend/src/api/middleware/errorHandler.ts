import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@src/utils/CustomError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  }

  console.log(err);
  return res.status(500).json({ error: 'Internal Server Error' });
};
