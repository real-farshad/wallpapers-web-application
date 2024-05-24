import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import { User } from '@models/userModel';
import getUserInfo from '@src/services/user/getUserInfo';
import deleteUser from '@services/user/deleteUser';
import updateUser from '@src/services/user/updateUser';

const handleGetUserInfo = (req: Request, res: Response) => {
  const user = req.user as User;
  const userProfile = getUserInfo(user);

  return res.json(userProfile);
};

const handleUpdateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const update = req.body;
  const updatedUser = await updateUser(user, update);

  return res.json(updatedUser);
});

const handleDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const credentials = req.body;

  const result = await deleteUser(user, credentials);
  return res.json(result);
});

export { handleGetUserInfo, handleUpdateUser, handleDeleteUser };
