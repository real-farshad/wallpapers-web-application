import incrementWallpapersCount from '@src/repositories/collections/incrementWallpapersCount';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const incrementCollectionWallpapersCount = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await incrementWallpapersCount(collectionObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to increment collection wallpaper count!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default incrementCollectionWallpapersCount;
