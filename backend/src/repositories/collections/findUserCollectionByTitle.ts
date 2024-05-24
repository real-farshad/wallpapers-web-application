import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';
import { Collection } from '@src/models/collectionModel';

const findUserCollectionByTitle = async (
  collectionTitle: string,
  userId: ObjectId
): Promise<Collection | undefined> => {
  const collectionsCollection = await getCollectionsCollection();
  const collection = await collectionsCollection.findOne({ title: collectionTitle, userId });
  return collection;
};

export default findUserCollectionByTitle;
