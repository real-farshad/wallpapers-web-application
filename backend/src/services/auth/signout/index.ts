import { Request, Response } from 'express';
import logout from './logout';
import destroySession from './destroySession';

const signout = async (req: Request, res: Response) => {
  await logout(req);

  await destroySession(req);

  res.clearCookie('connect.sid');

  const result = { message: 'Successfully logged out.' };
  return result;
};

export default signout;
