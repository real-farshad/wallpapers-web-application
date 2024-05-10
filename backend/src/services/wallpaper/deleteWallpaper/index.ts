import validateWallpaperId from './validateWallpaperId';
import deleteWallpaperFromDatabase from './deleteWallpaperFromDatabase';

const deleteWallpaper = async (wallpaperId: any, user: any) => {
  validateWallpaperId(wallpaperId);

  const publisherId = user._id;
  const result = await deleteWallpaperFromDatabase(wallpaperId, publisherId);

  return result;
};

export default deleteWallpaper;
