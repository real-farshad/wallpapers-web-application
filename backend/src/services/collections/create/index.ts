import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import insertCollection from '@src/repositories/collections/insertCollection';
import modifyCollection from './modifyCollection';
import validateCollection from './validateCollection';
import ensureCollectionIsUnique from './ensureCollectionIsUnique';

export interface CollectionPayload {
  title: string;
}

const create = async (collection: CollectionPayload, user: User) => {
  collection = validateCollection(collection);

  const collectionTitle = collection.title;
  const userId = user._id as ObjectId;
  await ensureCollectionIsUnique(collectionTitle, userId);

  const newCollection = modifyCollection(collection, userId);

  const savedCollection = await insertCollection(newCollection);
  return savedCollection;
};

export default create;
