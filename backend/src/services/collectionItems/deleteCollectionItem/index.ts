import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';
import decCollectionWallpaperCount from './decCollectionWallpaperCount';
import deleteUserCollectionItem from './deleteUserCollectionItem';
import validateCollectionItemId from './validateCollectionItemId';

const deleteCollectionItem = async (collectionItemId: string, user: User) => {
  collectionItemId = validateCollectionItemId(collectionItemId);

  const userId = user._id as ObjectId;
  const result = await deleteUserCollectionItem(collectionItemId, userId);

  await decCollectionWallpaperCount(collectionItemId);

  return result;
};

export default deleteCollectionItem;
