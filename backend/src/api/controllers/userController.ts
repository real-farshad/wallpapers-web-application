import { Request, Response } from 'express';
import { catchAsync } from '@src/utils/catchAsync';
import { User } from '@src/models/userModel';
import deleteUser from '@services/user/deleteUser';

const handleGetUserProfile = (req: Request, res: Response) => {
  const user = req.user as User;

  const userProfile = {
    _id: user._id,
    avatar: user.avatar,
    username: user.username,
    provider: user.provider,
  };

  return res.json(userProfile);
};

const handleDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const credentials = req.body;
  const user = req.user as User;

  await deleteUser(credentials, user);

  return res.json({ success: true });
});

export { handleGetUserProfile, handleDeleteUser };
