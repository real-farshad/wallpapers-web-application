import findCollectionById from '@src/repositories/collections/findCollectionById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const checkCollectionExists = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const collection = await findCollectionById(collectionObjectId);

  if (!collection) {
    const errorStatus = 404;
    const errorMessage = "A collection with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkCollectionExists;
