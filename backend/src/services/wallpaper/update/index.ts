import { User } from '@src/models/userModel';
import validateWallpaperUpdate from './validateWallpaperUpdate';
import modifyUpdate from './modifyUpdate';
import ensureUserIsWallpaperPublisher from './ensureUserIsWallpaperPublisher';
import updateWallpaper from './updateWallpaper';
import ensureWallpaperExists from '../../common/ensureWallpaperExists';
import validateWallpaperId from '@src/services/common/validateWallpaperId';

export interface WallpaperUpdate {
  image?: {
    thumbnail?: string;
    large?: string;
  };
  title?: string;
  category?: string;
}

const update = async (wallpaperId: string, update: WallpaperUpdate, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  update = validateWallpaperUpdate(update);

  const wallpaper = await ensureWallpaperExists(wallpaperId);

  ensureUserIsWallpaperPublisher(wallpaper, user);

  update = await modifyUpdate(update);

  const updatedWallpaper = await updateWallpaper(wallpaperId, update);
  return updatedWallpaper;
};

export default update;
