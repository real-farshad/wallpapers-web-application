import findAndDeleteUserCollectionItem from '@src/repositories/collectionItems/findAndDeleteUserCollectionItem';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const deleteUserCollectionItem = async (collectionId: string, userId: ObjectId) => {
  const collectionObjectId = new ObjectId(collectionId);
  const success = await findAndDeleteUserCollectionItem(collectionObjectId, userId);

  if (!success) {
    const errorStatus = 500;
    const errorMessage = 'Unable to delete user collection item!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default deleteUserCollectionItem;
