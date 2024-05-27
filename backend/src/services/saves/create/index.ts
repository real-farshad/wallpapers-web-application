import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import ensureWallpaperNotAlreadySaved from './ensureWallpaperNotAlreadySaved';
import validateSave from './validateSave';
import modifySave from './modifySave';
import insertSave from '@src/repositories/saves/insertSave';
import ensureWallpaperExists from '@src/services/common/ensureWallpaperExists';

export interface SavePayload {
  wallpaperId: string;
}

const create = async (save: SavePayload, user: User) => {
  save = validateSave(save);

  const wallpaperId = save.wallpaperId;
  await ensureWallpaperExists(wallpaperId);

  const userId = user._id as ObjectId;
  await ensureWallpaperNotAlreadySaved(wallpaperId, userId);

  const finalizedSave = modifySave(save, userId);

  const savedWallpaperSave = await insertSave(finalizedSave);
  return savedWallpaperSave;
};

export default create;
