import decCollectionWallpaperCount from './decCollectionWallpaperCount';
import deleteUserCollectionItem from './deleteUserCollectionItem';
import validateCollectionItemId from './validateCollectionItemId';

const deleteCollectionItem = async (collectionItemId: string, user: any) => {
  collectionItemId = validateCollectionItemId(collectionItemId);

  const userId = user._id;
  const result = await deleteUserCollectionItem(collectionItemId, userId);

  await decCollectionWallpaperCount(collectionItemId);

  return result;
};

export default deleteCollectionItem;
