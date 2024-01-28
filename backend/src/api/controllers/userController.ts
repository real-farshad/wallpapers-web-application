import { Request, Response } from 'express';
import { catchAsync } from '@src/utils/catchAsync';
import { deleteUserAccount } from '../services/userService';

const handleUserProfileRequest = (req: Request, res: Response) => {
  const user: any = req.user;

  const userProfile = {
    id: user._id,
    avatar: user.avatar,
    username: user.username,
    provider: user.provider,
  };

  return res.json(userProfile);
};

const handleDeleteAccountRequest = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const confirmation = req.body;

  await deleteUserAccount(user, confirmation);

  return res.json({ success: true });
});

export { handleUserProfileRequest, handleDeleteAccountRequest };
