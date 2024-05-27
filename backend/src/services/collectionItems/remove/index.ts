import { User } from '@src/models/userModel';
import { Collection } from '@src/models/collectionModel';
import decCollectionWallpaperCount from './decrementCollectionWallpapersCount';
import removeCollectionItem from './removeCollectionItem';
import validateCollectionItemId from './validateCollectionItemId';
import ensureUserIsCollectionPublisher from './ensureUserIsCollectionPublisher';
import ensureCollectionItemExists from './ensureCollectionItemExists';
import findCollectionById from '@src/repositories/collections/findCollectionById';

const remove = async (collectionItemId: string, user: User) => {
  collectionItemId = validateCollectionItemId(collectionItemId);

  const collectionItem = await ensureCollectionItemExists(collectionItemId);

  const collectionId = collectionItem.collectionId;
  const collection = (await findCollectionById(collectionId)) as Collection;
  await ensureUserIsCollectionPublisher(collection, user);

  const result = await removeCollectionItem(collectionItemId);

  await decCollectionWallpaperCount(collectionItemId);

  return result;
};

export default remove;
