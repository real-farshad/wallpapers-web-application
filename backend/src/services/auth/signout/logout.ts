import { Request } from 'express';
import { CustomError } from '@src/utils/CustomError';

const logout = async (req: Request) => {
  try {
    await logoutPromise(req);
  } catch (err) {
    const errorStatus = 500;
    const errorMessage = 'Logout failed, please try again.';
    throw new CustomError(errorStatus, errorMessage);
  }
};

const logoutPromise = (req: Request) =>
  new Promise<void>((resolve, reject) => {
    req.logout({ keepSessionInfo: false }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export default logout;
