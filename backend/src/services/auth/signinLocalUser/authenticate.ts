import passport from '@config/passportConfig';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@src/utils/CustomError';
import { User } from '@src/models/userModel';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await authenticatePromise(req, res, next);
    return user;
  } catch (err: any) {
    const errorStatus = err.status;
    const errorMessage = err.message;
    throw new CustomError(errorStatus, errorMessage);
  }
};

const authenticatePromise = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<{ user: User }> =>
  new Promise((resolve, reject) => {
    passport.authenticate('local', (err: Error, user: User, info: any, status: any) => {
      if (err) reject(err);
      else if (!user) reject({ status: status, message: info.message });
      else resolve({ user });
    })(req, res, next);
  });

export default authenticate;
