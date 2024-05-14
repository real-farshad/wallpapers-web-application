import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createSave from '@src/services/saves/createSave';
import deleteSave from '@src/services/saves/deleteSave';

const handlePostSave = catchAsync(async (req: Request, res: Response) => {
  const like = req.body;
  const user = req.user;

  const savedWallpaperSave = await createSave(like, user);
  res.status(201).json(savedWallpaperSave);
});

const handleDeleteSave = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user;

  const result = await deleteSave(wallpaperId, user);
  res.status(200).json(result);
});

export { handlePostSave, handleDeleteSave };
