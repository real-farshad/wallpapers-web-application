import { CollectionPayload } from '@src/models/collectionModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import saveCollection from '@src/repositories/collections/saveCollection';
import addNewFields from './addNewFields';
import validateCollection from './validateCollection';

const createCollection = async (collection: CollectionPayload, user: User) => {
  collection = validateCollection(collection);

  const userId = user._id as ObjectId;
  const newCollection = addNewFields(collection, userId);

  const savedCollection = await saveCollection(newCollection);
  return savedCollection;
};

export default createCollection;
