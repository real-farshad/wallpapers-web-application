import { Request, Response } from 'express';
import { catchAsync } from '@src/utils/catchAsync';
import { deleteUser } from '@services/userService';

const handleGetUserProfile = (req: Request, res: Response) => {
  const user: any = req.user;

  const userProfile = {
    id: user._id,
    avatar: user.avatar,
    username: user.username,
    provider: user.provider,
  };

  return res.json(userProfile);
};

const handleDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const confirmation = req.body;

  await deleteUser(user, confirmation);

  return res.json({ success: true });
});

export { handleGetUserProfile, handleDeleteUser };
