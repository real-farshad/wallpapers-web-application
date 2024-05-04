import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const findAndDeleteUserWallpaper = async (wallpaperId: string, publisherId: string) => {
  const usersCollection = await getWallpapersCollection();
  const result = await usersCollection.deleteOne({
    _id: new ObjectId(wallpaperId),
    publisherId: new ObjectId(publisherId),
  });

  if (result.deletedCount === 0) return { success: false };
  return { success: true };
};

export default findAndDeleteUserWallpaper;
