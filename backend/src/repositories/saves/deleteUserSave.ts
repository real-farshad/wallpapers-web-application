import { ObjectId } from 'mongodb';
import getSavesCollection from './getSavesCollection';

const deleteUserSave = async (wallpaperId: ObjectId, userId: ObjectId): Promise<boolean> => {
  const savesCollection = await getSavesCollection();
  const result = await savesCollection.deleteOne({ wallpaperId, userId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteUserSave;
