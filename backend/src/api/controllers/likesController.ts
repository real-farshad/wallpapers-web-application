import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createLike from '@src/services/likes/createLike';
import deleteLike from '@src/services/likes/deleteLike.ts';
import queryUserLikes from '@src/services/likes/queryUserLikes';
import queryUserLikesCount from '@src/services/likes/queryUserLikesCount';

const handlePostLike = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user;

  const savedLike = await createLike(like, user);
  res.status(201).json(savedLike);
});

const handleGetUserLikes = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user;

  const likedWallpapers = await queryUserLikes(query, user);
  res.status(200).json(likedWallpapers);
});

const handleGetLikesCount = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const likesCount = await queryUserLikesCount(user);
  res.status(200).json(likesCount);
});

const handleDeleteLike = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user;

  const result = await deleteLike(wallpaperId, user);
  res.status(200).json(result);
});

export { handlePostLike, handleGetUserLikes, handleGetLikesCount, handleDeleteLike };
