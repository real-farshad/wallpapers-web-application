import { CustomError } from '@src/utils/CustomError';
import { NextFunction, Request, Response } from 'express';

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  next(new CustomError(401, 'unauthoized!'));
};

export { authenticateUser };
