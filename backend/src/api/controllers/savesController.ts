import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/saves/create';
import remove from '@src/services/saves/remove';
import search from '@src/services/saves/search';
import findOne from '@src/services/saves/findOne';
import { User } from '@src/models/userModel';

const createSave = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user as User;

  const savedWallpaperSave = await create(like, user);
  res.status(201).json(savedWallpaperSave);
});

const findOneSave = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await findOne(wallpaperId, user);
  res.status(200).json(result);
});

const searchSaves = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user as User;

  const result = await search(query, user);
  res.status(200).json(result);
});

const removeSave = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await remove(wallpaperId, user);
  res.status(204).json(result);
});

export { createSave, findOneSave, searchSaves, removeSave };
