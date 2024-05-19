import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';
import { Collection } from '@src/models/collectionModel';

const findCollectionById = async (id: string): Promise<Collection | undefined> => {
  const collectionsCollection = await getCollectionsCollection();
  const collection = await collectionsCollection.findOne({ _id: new ObjectId(id) });
  return collection;
};

export default findCollectionById;
