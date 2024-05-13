import validateWallpaperId from './validateWallpaperId';
import findWallpaperInDatabase from './findWallpaperInDatabase';

const getWallpaperDetails = async (wallpaperId: string, userId?: string) => {
  validateWallpaperId(wallpaperId);

  const wallpaper = await findWallpaperInDatabase(wallpaperId, userId);
  return wallpaper;
};

export default getWallpaperDetails;
