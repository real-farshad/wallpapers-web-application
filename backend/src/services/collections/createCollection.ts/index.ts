import saveCollection from '@src/repositories/collections/saveCollection';
import addNewFields from './addNewFields';
import validateCollection from './validateCollection';

export interface collectionInput {
  title: string;
}

const createCollection = async (collection: collectionInput, user: any) => {
  collection = validateCollection(collection);

  const userId = user._id;
  const newCollection = addNewFields(collection, userId);

  const savedCollection = await saveCollection(newCollection);
  return savedCollection;
};

export default createCollection;
