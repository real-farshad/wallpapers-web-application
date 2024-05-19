import { User } from '@src/models/userModel';
import validateWallpaperId from './validateWallpaperId';
import validateWallpaperUpdate from './validateWallpaperUpdate';
import replaceUpdatedFields from './replaceUpdatedFields';
import checkCategoryUpdate from './checkCategoryUpdate';
import checkWallpaperPublisherIsUser from './checkWallpaperPublisherIsUser';
import findWallpaperToUpdate from './findWallpaperToUpdate';
import updateWallpaperInDatabase from './updateWallpaperInDatabase';

export interface WallpaperUpdate {
  image?: {
    thumbnail?: string;
    large?: string;
  };
  title?: string;
  category?: string;
}

const updateWallpaper = async (wallpaperId: string, update: WallpaperUpdate, user: User) => {
  wallpaperId = validateWallpaperId(wallpaperId);

  update = validateWallpaperUpdate(update);

  const wallpaper = await findWallpaperToUpdate(wallpaperId);

  checkWallpaperPublisherIsUser(wallpaper, user);

  update = await checkCategoryUpdate(update);

  const finalizedUpdate = replaceUpdatedFields(wallpaper, update);

  const updatedWallpaper = await updateWallpaperInDatabase(wallpaperId, finalizedUpdate);
  return updatedWallpaper;
};

export default updateWallpaper;
