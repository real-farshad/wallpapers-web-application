import { Request, Response, NextFunction } from 'express';
import authenticate from './authenticate';
import login from './login';

const signinLocalUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await authenticate(req, res, next);
  await login(req, user);

  const result = { success: true };
  return result;
};

export default signinLocalUser;
