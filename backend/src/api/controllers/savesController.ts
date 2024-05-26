import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createSave from '@src/services/saves/createSave';
import deleteSave from '@src/services/saves/deleteSave';
import queryUserSaves from '@src/services/saves/queryUserSaves';
import { User } from '@src/models/userModel';

const handlePostSave = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user as User;

  const savedWallpaperSave = await createSave(like, user);
  res.status(201).json(savedWallpaperSave);
});

const handleGetUserSaves = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user as User;

  const result = await queryUserSaves(query, user);
  res.status(200).json(result);
});

const handleDeleteSave = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await deleteSave(wallpaperId, user);
  res.status(200).json(result);
});

export { handlePostSave, handleGetUserSaves, handleDeleteSave };
