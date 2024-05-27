import getCollectionItemsCollection from './getCollectionItemsCollection';
import { CollectionItem } from '@src/models/collectionItemModel';

const insertCollectionItem = async (collectionItem: CollectionItem): Promise<CollectionItem> => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const result = await collectionItemsCollection.insertOne(collectionItem);

  const savedCollectionItem = { _id: result.insertedId, ...collectionItem };
  return savedCollectionItem;
};

export default insertCollectionItem;
