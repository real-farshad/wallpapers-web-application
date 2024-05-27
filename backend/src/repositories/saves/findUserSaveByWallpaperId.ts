import { ObjectId } from 'mongodb';
import getSavesCollection from './getSavesCollection';
import { Save } from '@src/models/saveModel';

const findUserSaveByWallpaperId = async (
  wallpaperId: ObjectId,
  userId: ObjectId
): Promise<Save | undefined> => {
  const savesCollection = await getSavesCollection();
  const save = await savesCollection.findOne({ wallpaperId, userId });
  return save;
};

export default findUserSaveByWallpaperId;
