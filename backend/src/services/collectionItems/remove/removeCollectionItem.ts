import deleteCollectionItemById from '@repositories/collectionItems/deleteCollectionItemById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeCollectionItem = async (collectionItemId: string) => {
  const collectionItemObjectId = new ObjectId(collectionItemId);
  const success = await deleteCollectionItemById(collectionItemObjectId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A collection item, with this collection id, doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeCollectionItem;
