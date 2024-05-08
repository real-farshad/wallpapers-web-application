import { Request } from 'express';
import { CustomError } from '@src/utils/CustomError';

const destroySession = async (req: Request) => {
  try {
    await destroySessionPromise(req);
  } catch (err) {
    const errorStatus = 500;
    const errorMessage = 'Logout failed, please try again.';
    throw new CustomError(errorStatus, errorMessage);
  }
};

const destroySessionPromise = (req: Request) =>
  new Promise<void>((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

export default destroySession;
