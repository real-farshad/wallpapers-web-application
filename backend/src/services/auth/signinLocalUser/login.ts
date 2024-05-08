import { Request } from 'express';
import { CustomError } from '@src/utils/CustomError';
import { User } from '@src/models/userModel';

const login = async (req: Request, user: User) => {
  try {
    await loginPromise(req, user);
  } catch (err) {
    const errorStatus = 500;
    const errorMessage = 'Unable to signin! please try again later.';
    throw new CustomError(errorStatus, errorMessage);
  }
};

const loginPromise = (req: Request, user: User): Promise<void> =>
  new Promise((resolve, reject) => {
    req.logIn(user, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export default login;
