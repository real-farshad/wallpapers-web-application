import validateWallpaperId from './validateWallpaperId';
import deleteSaveFromDatabase from './deleteLikeFromDatabase';
import decrementWallpaperLikes from './decrementWallpaperLikes';

const deleteLike = async (wallpaperId: string, user: any) => {
  validateWallpaperId(wallpaperId);

  const userId = user._id;
  const result = await deleteSaveFromDatabase(wallpaperId, userId);

  await decrementWallpaperLikes(wallpaperId);

  return result;
};

export default deleteLike;
