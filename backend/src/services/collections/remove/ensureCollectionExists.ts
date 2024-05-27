import findUserCollectionById from '@src/repositories/collections/findUserCollectionById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureCollectionExists = async (collectionId: string, userId: ObjectId) => {
  const collectionObjectId = new ObjectId(collectionId);
  const collection = await findUserCollectionById(collectionObjectId, userId);

  if (!collection) {
    const errorStatus = 404;
    const errorMessage = "A collection with this id, published by this user, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return collection;
};

export default ensureCollectionExists;
