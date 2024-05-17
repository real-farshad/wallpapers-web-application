import { CategoryUpdate } from '@src/models/categoryModel';
import updateUserCollection from '@src/repositories/collections/updateUserCollection';
import { ObjectId } from 'mongodb';

const updateCollectionInDatabase = async (
  collectionId: string,
  update: CategoryUpdate,
  userId: ObjectId
) => {
  const collectionObjectId = new ObjectId(collectionId);
  const updatedCollection = await updateUserCollection(collectionObjectId, update, userId);

  return updatedCollection;
};

export default updateCollectionInDatabase;
