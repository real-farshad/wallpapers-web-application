import deleteCollectionById from '@src/repositories/collections/deleteCollectionById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeCollection = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await deleteCollectionById(collectionObjectId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to delete this collection!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const result = { success: true };
  return result;
};

export default removeCollection;
