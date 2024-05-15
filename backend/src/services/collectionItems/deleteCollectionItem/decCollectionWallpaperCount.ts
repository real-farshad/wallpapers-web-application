import decrementCollectionWallpaperCount from '@src/repositories/collections/decrementCollectionWallpaperCount';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const decCollectionWallpaperCount = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await decrementCollectionWallpaperCount(collectionObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to decrement collection wallpaper count!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default decCollectionWallpaperCount;
