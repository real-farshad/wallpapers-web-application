import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import findCollectionItems from '@src/repositories/collectionItems/findCollectionItems';
import { CollectionItemsQuery } from '.';

const searchCollectionItems = async (
  collectionId: string,
  query: CollectionItemsQuery,
  user?: User
) => {
  const collectionObjectId = new ObjectId(collectionId);
  const userId = user?._id as ObjectId;

  const collectionWallpapers = await findCollectionItems(collectionObjectId, query, userId);

  return collectionWallpapers;
};

export default searchCollectionItems;
