import { ObjectId } from 'mongodb';
import getCollectionItemsCollection from './getCollectionItemsCollection';

const deleteManyCollectionItems = async (collectionId: ObjectId) => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const result = await collectionItemsCollection.deleteMany({ collectionId });

  const deletedCollectionItemsCount = result.deletedCount;
  return deletedCollectionItemsCount;
};

export default deleteManyCollectionItems;
