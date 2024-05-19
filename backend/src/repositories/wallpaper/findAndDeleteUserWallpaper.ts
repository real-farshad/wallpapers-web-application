import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const findAndDeleteUserWallpaper = async (
  wallpaperId: ObjectId,
  publisherId: ObjectId
): Promise<boolean> => {
  const usersCollection = await getWallpapersCollection();
  const result = await usersCollection.deleteOne({
    _id: wallpaperId,
    publisherId: publisherId,
  });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default findAndDeleteUserWallpaper;
