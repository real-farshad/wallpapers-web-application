import deleteManyCollectionItems from '@src/repositories/collectionItems/deleteManyCollectionItems';
import { ObjectId } from 'mongodb';

const removeCollectionItems = async (collectionId: string) => {
  const collectionObjectId = new ObjectId(collectionId);
  const deleteCount = await deleteManyCollectionItems(collectionObjectId);
  return deleteCount;
};

export default removeCollectionItems;
