import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import create from '@src/services/wallpaper/create';
import remove from '@src/services/wallpaper/remove';
import update from '@src/services/wallpaper/update';
import findOne from '@src/services/wallpaper/findOne';
import search from '@src/services/wallpaper/search';
import { User } from '@src/models/userModel';

const createWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaper = req.body;
  const user = req.user as any;

  const savedWallpaper = await create(wallpaper, user);
  return res.status(201).json(savedWallpaper);
});

const searchWallpapers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user as User;

  const result = await search(query, user);
  return res.status(200).json(result);
});

const findOneWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const wallpaper = await findOne(wallpaperId, user);
  return res.status(200).json(wallpaper);
});

const updateWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const wallpaperUpdate = req.body;
  const user = req.user as User;

  const updatedWallpaper = await update(wallpaperId, wallpaperUpdate, user);
  return res.status(200).json(updatedWallpaper);
});

const removeWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await remove(wallpaperId, user);
  return res.status(204).json(result);
});

export { createWallpaper, searchWallpapers, findOneWallpaper, updateWallpaper, removeWallpaper };
