import { Collection } from '@src/models/collectionModel';
import getCollectionsCollection from './getCollectionsCollection';

const insertCollection = async (collection: Collection): Promise<Collection> => {
  const collectionsCollection = await getCollectionsCollection();
  const result = await collectionsCollection.insertOne(collection);

  const savedCollection = { _id: result.insertedId, ...collection };
  return savedCollection;
};

export default insertCollection;
