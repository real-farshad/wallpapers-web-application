import { SavePayload } from '@src/models/saveModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import saveLike from '@src/repositories/likes/saveLike';
import checkWallpaperExists from './checkWallpaperExists';
import checkWallpaperNotAlreadySaved from './checkWallpaperNotAlreadySaved';
import validateSave from './validateSave';
import refineSaveData from './refineSaveData';

const createSave = async (like: SavePayload, user: User) => {
  validateSave(like);

  const wallpaperId = like.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const userId = user._id as ObjectId;
  await checkWallpaperNotAlreadySaved(wallpaperId, userId);

  const finalizedSave = refineSaveData(like, userId);

  const savedWallpaperSave = await saveLike(finalizedSave);
  return savedWallpaperSave;
};

export default createSave;
