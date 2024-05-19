import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import checkWallpaperExists from './checkWallpaperExists';
import checkWallpaperNotAlreadySaved from './checkWallpaperNotAlreadySaved';
import validateSave from './validateSave';
import refineSaveData from './refineSaveData';
import saveWallpaperSave from '@src/repositories/saves/saveWallpaperSave';

export interface SavePayload {
  wallpaperId: string;
}

const createSave = async (save: SavePayload, user: User) => {
  save = validateSave(save);

  const wallpaperId = save.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const userId = user._id as ObjectId;
  await checkWallpaperNotAlreadySaved(wallpaperId, userId);

  const finalizedSave = refineSaveData(save, userId);

  const savedWallpaperSave = await saveWallpaperSave(finalizedSave);
  return savedWallpaperSave;
};

export default createSave;
