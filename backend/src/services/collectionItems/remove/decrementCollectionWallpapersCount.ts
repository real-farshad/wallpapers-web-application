import decrementWallpapersCount from '@src/repositories/collections/decrementWallpapersCount';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const decrementCollectionWallpapersCount = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await decrementWallpapersCount(collectionObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to decrement collection wallpaper count!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default decrementCollectionWallpapersCount;
