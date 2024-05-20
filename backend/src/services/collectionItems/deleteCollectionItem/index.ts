import { User } from '@src/models/userModel';
import { Collection } from '@src/models/collectionModel';
import decCollectionWallpaperCount from './decCollectionWallpaperCount';
import deleteCollectionItemFromDatabase from './deleteCollectionItemFromDatabase';
import validateCollectionItemId from './validateCollectionItemId';
import checkUserIsCollectionPublisher from './checkUserIsCollectionPublisher';
import checkCollectionItemExists from './checkCollectionItemExists';
import findCollectionById from '@src/repositories/collections/findCollectionById';

const deleteCollectionItem = async (collectionItemId: string, user: User) => {
  collectionItemId = validateCollectionItemId(collectionItemId);

  const collectionItem = await checkCollectionItemExists(collectionItemId);

  const collectionId = collectionItem.collectionId;
  const collection = (await findCollectionById(collectionId)) as Collection;
  await checkUserIsCollectionPublisher(collection, user);

  const result = await deleteCollectionItemFromDatabase(collectionItemId);

  await decCollectionWallpaperCount(collectionItemId);

  return result;
};

export default deleteCollectionItem;
