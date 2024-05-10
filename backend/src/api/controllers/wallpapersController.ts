import { Request, Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import createWallpaper from '@src/services/wallpaper/createWallpaper';
import deleteWallpaper from '@src/services/wallpaper/deleteWallpaper';

const handlePostWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaper = req.body;
  const user = req.user as any;

  const savedWallpaper = await createWallpaper(wallpaper, user);
  return res.json(savedWallpaper);
});

const handleDeleteWallpaper = catchAsync(async (req: Request, res: Response) => {
  const wallpaperId = req.params.id;
  const user = req.user as any;

  const result = await deleteWallpaper(wallpaperId, user);
  return res.json(result);
});

export { handlePostWallpaper, handleDeleteWallpaper };
