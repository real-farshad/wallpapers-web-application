import { ObjectId } from 'mongodb';
import { CollectionItem } from '@src/models/collectionItemModel';
import getCollectionItemsCollection from './getCollectionItemsCollection';

const findCollectionItem = async (
  wallpaperId: ObjectId,
  collectionId: ObjectId
): Promise<CollectionItem | undefined> => {
  const collectionItemsCollection = await getCollectionItemsCollection();
  const collectionItem = await collectionItemsCollection.findOne({ wallpaperId, collectionId });
  return collectionItem;
};

export default findCollectionItem;
