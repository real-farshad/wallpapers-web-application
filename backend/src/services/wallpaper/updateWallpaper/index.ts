import validateWallpaperId from './validateWallpaperId';
import validateWallpaperUpdate from './validateWallpaperUpdate';
import updateWallpaperById from '@src/repositories/wallpaper/updateWallpaperById';
import replaceUpdatedFields from './replaceUpdatedFields';
import checkCategoryUpdate from './checkCategoryUpdate';
import checkWallpaperPublisherIsUser from './checkWallpaperPublisherIsUser';
import findWallpaperToUpdate from './findWallpaperToUpdate';

export interface updateInput {
  image?: {
    thumbnail: string;
    large: string;
  };
  title?: string;
  category?: string;
}

export interface userInput {
  _id: string;
}

const updateWallpaper = async (wallpaperId: string, update: updateInput, user: userInput) => {
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
