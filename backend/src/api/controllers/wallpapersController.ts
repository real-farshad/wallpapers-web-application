import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createWallpaper from '@src/services/wallpaper/createWallpaper';
import deleteWallpaper from '@src/services/wallpaper/deleteWallpaper';
import updateWallpaper from '@src/services/wallpaper/updateWallpaper';
import getWallpaperDetails from '@src/services/wallpaper/getWallpaperDetails';

const handlePostWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaper = req.body;
  const user = req.user as any;

  const savedWallpaper = await createWallpaper(wallpaper, user);
  return res.json(savedWallpaper);
});

const handleGetWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;

  const user: any = req.user;
  const userId = user?._id;

  const wallpaper = await getWallpaperDetails(wallpaperId, userId);
  return res.json(wallpaper);
});

const hadnleUpdateWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const update = req.body;
  const user = req.user as any;

  const updatedWallpaper = await updateWallpaper(wallpaperId, update, user);
  return res.json(updatedWallpaper);
});

const handleDeleteWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as any;

  const result = await deleteWallpaper(wallpaperId, user);
  return res.json(result);
});

export { handlePostWallpaper, handleGetWallpaper, hadnleUpdateWallpaper, handleDeleteWallpaper };
