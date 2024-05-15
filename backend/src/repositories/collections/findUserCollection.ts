import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const findUserCollection = async (collectionId: ObjectId, userId: ObjectId) => {
  const collectionsCollection = await getCollectionsCollection();
  const collection = await collectionsCollection.findOne({ _id: collectionId, userId });
  return collection;
};

export default findUserCollection;
