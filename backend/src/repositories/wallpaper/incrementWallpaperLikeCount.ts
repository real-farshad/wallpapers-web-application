import { ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const incrementWallpaperLikeCount = async (wallpaperId: ObjectId): Promise<boolean> => {
  const wallpapersCollection = await getWallpapersCollection();
  const result = await wallpapersCollection.updateOne(
    { _id: wallpaperId },
    { $inc: { likeCount: 1 } }
  );

  const success = result.modifiedCount === 1;
  return success;
};

export default incrementWallpaperLikeCount;
