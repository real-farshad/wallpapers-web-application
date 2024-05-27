import updateUserCollection from '@src/repositories/collections/updateUserCollection';
import { ObjectId } from 'mongodb';
import { CollectionUpdate } from '.';

const updateCollection = async (
  collectionId: string,
  update: CollectionUpdate,
  userId: ObjectId
) => {
  const collectionObjectId = new ObjectId(collectionId);
  const updatedCollection = await updateUserCollection(collectionObjectId, update, userId);

  return updatedCollection;
};

export default updateCollection;
