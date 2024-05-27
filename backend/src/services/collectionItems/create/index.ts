import { User } from '@src/models/userModel';
import validateCollectionItem from './validateCollectionItem';
import ensureCollectionItemIsUnique from './ensureCollectionItemIsUnique';
import ensureCollectionExists from '../ensureCollectionExists';
import ensureUserIsCollectionPublisher from './ensureUserIsCollectionPublisher';
import modifyCollectionItemFields from './modifyCollectionItemFields';
import insertCollectionItem from '@src/repositories/collectionItems/insertCollectionItem';
import incrementCollectionWallpapersCount from './incrementCollectionWallpapersCount';
import ensureWallpaperExists from '@src/services/common/ensureWallpaperExists';

export interface CollectionItemPayload {
  collectionId: string;
  wallpaperId: string;
}

const create = async (collectionItem: CollectionItemPayload, user: User) => {
  collectionItem = validateCollectionItem(collectionItem);

  await ensureCollectionItemIsUnique(collectionItem);

  const wallpaperId = collectionItem.wallpaperId;
  await ensureWallpaperExists(wallpaperId);

  const collectionId = collectionItem.collectionId;
  const collection = await ensureCollectionExists(collectionId);
  await ensureUserIsCollectionPublisher(collection, user);

  const newCollectionItem = await modifyCollectionItemFields(collectionItem);

  const savedCollectionItem = await insertCollectionItem(newCollectionItem);

  await incrementCollectionWallpapersCount(collectionId);

  return savedCollectionItem;
};

export default create;
