import { ObjectId } from 'mongodb';
import getSavesCollection from './getSavesCollection';

const findUserSavesCount = async (userId: ObjectId): Promise<number> => {
  const savesCollection = await getSavesCollection();
  const savesCount = await savesCollection.countDocuments({ userId });
  return savesCount;
};

export default findUserSavesCount;
