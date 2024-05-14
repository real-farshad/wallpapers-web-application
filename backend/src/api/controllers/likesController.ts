import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createLike from '@src/services/likes/createLike';
import deleteLike from '@src/services/likes/deleteLike.ts';

const handlePostLike = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user;

  const savedLike = await createLike(like, user);
  res.status(201).json(savedLike);
});

const handleDeleteLike = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user;

  const result = await deleteLike(wallpaperId, user);
  res.status(200).json(result);
});

export { handlePostLike, handleDeleteLike };
