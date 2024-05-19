import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const deleteCollectionById = async (collectionId: ObjectId): Promise<boolean> => {
  const collectionsCollection = await getCollectionsCollection();
  const result = await collectionsCollection.deleteOne({ _id: collectionId });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteCollectionById;
