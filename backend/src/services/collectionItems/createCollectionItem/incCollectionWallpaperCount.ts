import incrementCollectionWallpaperCount from '@src/repositories/collections/incrementCollectionWallpaperCount';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const incCollectionWallpaperCount = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await incrementCollectionWallpaperCount(collectionObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to increment collection wallpaper count!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default incCollectionWallpaperCount;
