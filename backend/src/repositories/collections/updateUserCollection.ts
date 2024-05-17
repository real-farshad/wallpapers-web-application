import { CollectionUpdate } from '@src/models/collectionModel';
import getCollectionsCollection from './getCollectionsCollection';
import { ObjectId } from 'mongodb';

const updateUserCollection = async (
  collectionId: ObjectId,
  update: CollectionUpdate,
  userId: ObjectId
) => {
  const collectionsCollection = await getCollectionsCollection();
  const result = await collectionsCollection.findOneAndUpdate(
    { _id: collectionId, userId },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateUserCollection;
