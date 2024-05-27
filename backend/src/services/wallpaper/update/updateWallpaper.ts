import { ObjectId } from 'mongodb';
import { WallpaperUpdate } from '.';
import updateWallpaperById from '@src/repositories/wallpaper/updateWallpaperById';

const updateWallpaper = async (wallpaperId: string, update: WallpaperUpdate) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const updatedWallpaper = await updateWallpaperById(wallpaperObjectId, update);
  return updatedWallpaper;
};

export default updateWallpaper;
