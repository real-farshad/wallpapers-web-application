import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import queryCollectionItems from '@src/repositories/collectionItems/queryCollectionItems';
import { CollectionItemsQuery } from '.';

const queryWallpapersInDatabase = async (
  collectionId: string,
  query: CollectionItemsQuery,
  user: User
) => {
  const collectionObjectId = new ObjectId(collectionId);
  const userId = user._id as ObjectId;

  const collectionWallpapers = await queryCollectionItems(collectionObjectId, query, userId);

  return collectionWallpapers;
};

export default queryWallpapersInDatabase;
