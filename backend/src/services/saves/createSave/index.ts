import saveLike from '@src/repositories/likes/saveLike';
import checkWallpaperExists from './checkWallpaperExists';
import checkWallpaperNotAlreadySaved from './checkWallpaperNotAlreadySaved';
import validateSave from './validateSave';
import refineSaveData from './refineSaveData';

export interface saveInput {
  wallpaperId: string;
}

const createSave = async (like: saveInput, user: any) => {
  validateSave(like);

  const wallpaperId = like.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const userId = user._id;
  await checkWallpaperNotAlreadySaved(wallpaperId, userId);

  const finalizedSave = refineSaveData(like, user);

  const savedWallpaperSave = await saveLike(finalizedSave);
  return savedWallpaperSave;
};

export default createSave;
