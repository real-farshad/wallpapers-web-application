import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/likes/create';
import remove from '@src/services/likes/remove';
import search from '@src/services/likes/search';
import findOne from '@src/services/likes/findOne';
import { User } from '@src/models/userModel';

const createLike = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user as User;

  const savedLike = await create(like, user);
  res.status(201).json(savedLike);
});

const findOneLike = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await findOne(wallpaperId, user);
  res.status(200).json(result);
});

const searchLikes = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user as User;

  const result = await search(query, user);
  res.status(200).json(result);
});

const removeLike = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await remove(wallpaperId, user);
  res.status(204).json(result);
});

export { createLike, findOneLike, searchLikes, removeLike };
