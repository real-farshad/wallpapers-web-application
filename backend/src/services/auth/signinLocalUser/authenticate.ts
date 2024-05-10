import passport from '@config/passportConfig';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@src/utils/CustomError';
import { User } from '@src/models/userModel';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await authenticatePromise(req, res, next);
    return user;
  } catch (err: any) {
    const errorStatus = 400;
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
    passport.authenticate('local', (err: Error, user: User, info: any) => {
      if (err) reject(err);
      else if (!user) reject({ message: info.message });
      else resolve({ user });
    })(req, res, next);
  });

export default authenticate;
