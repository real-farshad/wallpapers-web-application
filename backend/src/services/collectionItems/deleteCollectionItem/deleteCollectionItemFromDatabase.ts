import deleteCollectionItemById from '@repositories/collectionItems/deleteCollectionItemById';
import { ObjectId } from 'mongodb';

const deleteCollectionItemFromDatabase = async (collectionItemId: string) => {
  const collectionItemObjectId = new ObjectId(collectionItemId);
  await deleteCollectionItemById(collectionItemObjectId);

  return { success: true };
};

export default deleteCollectionItemFromDatabase;
