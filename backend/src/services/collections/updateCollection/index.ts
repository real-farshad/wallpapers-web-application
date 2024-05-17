import { CategoryUpdate } from '@src/models/categoryModel';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import validateCollectionId from './validateCollectionId';
import validateCollectionUpdate from './validateCollectionUpdate';
import updateCollectionInDatabase from './updateCollectionInDatabase';

const updateCollection = async (collectionId: string, update: CategoryUpdate, user: User) => {
  collectionId = validateCollectionId(collectionId);

  update = validateCollectionUpdate(update);

  const userId = user._id as ObjectId;
  const updatedCollection = await updateCollectionInDatabase(collectionId, update, userId);

  return updatedCollection;
};

export default updateCollection;
