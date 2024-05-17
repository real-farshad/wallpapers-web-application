import queryCollectionItems from '@src/repositories/collectionItems/queryCollectionItems';
import { ObjectId } from 'mongodb';
import { queryInput } from '.';

const queryWallpapersInDatabase = async (collectionId: string, query: queryInput, user: any) => {
  const collectionObjectId = new ObjectId(collectionId);
  const userId = user._id;

  const collectionWallpapers = await queryCollectionItems(collectionObjectId, query, userId);

  return collectionWallpapers;
};

export default queryWallpapersInDatabase;
