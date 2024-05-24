import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';
import { Collection } from '@src/models/collectionModel';

const findUserCollectionById = async (
  collectionId: ObjectId,
  userId: ObjectId
): Promise<Collection | undefined> => {
  const collectionsCollection = await getCollectionsCollection();
  const collection = await collectionsCollection.findOne({ _id: collectionId, userId });
  return collection;
};

export default findUserCollectionById;
