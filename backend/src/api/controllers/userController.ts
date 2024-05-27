import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { User } from '@models/userModel';
import getInfo from '@src/services/user/getInfo';
import remove from '@src/services/user/remove';
import update from '@src/services/user/update';

const getUserInfo = (req: Request, res: Response) => {
  const user = req.user as User;
  const userProfile = getInfo(user);

  return res.status(200).json(userProfile);
};

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const userUpdate = req.body;
  const updatedUser = await update(user, userUpdate);

  return res.status(200).json(updatedUser);
});

const removeUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const credentials = req.body;

  const result = await remove(user, credentials);
  return res.status(204).json(result);
});

export { getUserInfo, updateUser, removeUser };
