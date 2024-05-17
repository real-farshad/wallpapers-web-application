import { User } from '@src/models/userModel';
import { WallpaperUpdate } from '@src/models/wallpaperModel';
import validateWallpaperId from './validateWallpaperId';
import validateWallpaperUpdate from './validateWallpaperUpdate';
import updateWallpaperById from '@src/repositories/wallpaper/updateWallpaperById';
import replaceUpdatedFields from './replaceUpdatedFields';
import checkCategoryUpdate from './checkCategoryUpdate';
import checkWallpaperPublisherIsUser from './checkWallpaperPublisherIsUser';
import findWallpaperToUpdate from './findWallpaperToUpdate';

const updateWallpaper = async (wallpaperId: string, update: WallpaperUpdate, user: User) => {
  validateWallpaperId(wallpaperId);

  update = validateWallpaperUpdate(update);

  const wallpaper = await findWallpaperToUpdate(wallpaperId);

  checkWallpaperPublisherIsUser(wallpaper, user);

  update = await checkCategoryUpdate(update);

  const finalizedUpdate = replaceUpdatedFields(wallpaper, update);

  const updatedWallpaper = await updateWallpaperById(wallpaperId, finalizedUpdate);
  return updatedWallpaper;
};

export default updateWallpaper;
