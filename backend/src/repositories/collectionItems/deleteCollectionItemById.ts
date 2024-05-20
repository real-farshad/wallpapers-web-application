import { ObjectId } from 'mongodb';
import getCollectionItemsCollection from './getCollectionItemsCollection';

const deleteCollectionItemById = async (collectionItemId: ObjectId): Promise<boolean> => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const result = await collectionItemsCollection.deleteOne({ _id: collectionItemId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteCollectionItemById;
