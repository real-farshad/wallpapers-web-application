import { ObjectId } from 'mongodb';
import getCollectionItemsCollection from './getCollectionItemsCollection';
import { CollectionItem } from '@src/models/collectionItemModel';

const findCollectionItemById = async (id: ObjectId): Promise<CollectionItem | undefined> => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const collectionItem = await collectionItemsCollection.findOne({ _id: id });
  return collectionItem;
};

export default findCollectionItemById;
