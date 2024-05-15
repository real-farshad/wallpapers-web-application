import { ObjectId } from 'mongodb';
import getCollectionItemsCollection from './getCollectionItemsCollection';

const findAndDeleteUserCollectionItem = async (collectionItemId: ObjectId, userId: ObjectId) => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const result = await collectionItemsCollection.deleteOne({ _id: collectionItemId, userId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default findAndDeleteUserCollectionItem;
