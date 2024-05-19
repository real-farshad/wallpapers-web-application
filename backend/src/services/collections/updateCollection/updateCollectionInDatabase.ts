import updateUserCollection from '@src/repositories/collections/updateUserCollection';
import { ObjectId } from 'mongodb';
import { CollectionUpdate } from '.';

const updateCollectionInDatabase = async (
  collectionId: string,
  update: CollectionUpdate,
  userId: ObjectId
) => {
  const collectionObjectId = new ObjectId(collectionId);
  const updatedCollection = await updateUserCollection(collectionObjectId, update, userId);

  return updatedCollection;
};

export default updateCollectionInDatabase;
