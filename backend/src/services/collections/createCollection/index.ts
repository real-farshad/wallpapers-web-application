import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import saveCollection from '@src/repositories/collections/saveCollection';
import addNewFields from './addNewFields';
import validateCollection from './validateCollection';
import verifyUniqueCollectionTitle from './verifyUniqueCollectionTitle';

export interface CollectionPayload {
  title: string;
}

const createCollection = async (collection: CollectionPayload, user: User) => {
  collection = validateCollection(collection);

  const collectionTitle = collection.title;
  const userId = user._id as ObjectId;
  await verifyUniqueCollectionTitle(collectionTitle, userId);

  const newCollection = addNewFields(collection, userId);

  const savedCollection = await saveCollection(newCollection);
  return savedCollection;
};

export default createCollection;
