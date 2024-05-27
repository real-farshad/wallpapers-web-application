import findUserSave from '@src/repositories/saves/findUserSave';
import { ObjectId } from 'mongodb';

const findSave = async (wallpaperId: string, userId: ObjectId) => {
  const wallpaperObjectId = new ObjectId(wallpaperId);
  const save = await findUserSave(wallpaperObjectId, userId);

  if (!save) return { save: false };
  return save;
};

export default findSave;
