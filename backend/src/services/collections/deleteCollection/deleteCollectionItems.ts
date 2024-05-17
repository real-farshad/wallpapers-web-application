import deleteCollectionItemsByCollectionId from '@src/repositories/collectionItems/deleteCollectionItemsByCollectionId';
import { ObjectId } from 'mongodb';

const deleteCollectionItems = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const deleteCount = await deleteCollectionItemsByCollectionId(collectionObjectId);
  return deleteCount;
};

export default deleteCollectionItems;
