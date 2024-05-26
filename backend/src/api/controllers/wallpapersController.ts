import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createWallpaper from '@src/services/wallpaper/createWallpaper';
import deleteWallpaper from '@src/services/wallpaper/deleteWallpaper';
import updateWallpaper from '@src/services/wallpaper/updateWallpaper';
import getWallpaperDetails from '@src/services/wallpaper/getWallpaperDetails';
import searchWallpapers from '@src/services/wallpaper/searchWallpapers';
import { User } from '@src/models/userModel';

const handlePostWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaper = req.body;
  const user = req.user as any;

  const savedWallpaper = await createWallpaper(wallpaper, user);
  return res.json(savedWallpaper);
});

const handleGetWallpapersSearch = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const user = req.user as User;

  const result = await searchWallpapers(query, user);
  return res.json(result);
});

const handleGetWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const wallpaper = await getWallpaperDetails(wallpaperId, user);
  return res.json(wallpaper);
});

const hadnleUpdateWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const update = req.body;
  const user = req.user as User;

  const updatedWallpaper = await updateWallpaper(wallpaperId, update, user);
  return res.json(updatedWallpaper);
});

const handleDeleteWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as User;

  const result = await deleteWallpaper(wallpaperId, user);
  return res.json(result);
});

export {
  handlePostWallpaper,
  handleGetWallpapersSearch,
  handleGetWallpaper,
  hadnleUpdateWallpaper,
  handleDeleteWallpaper,
};
