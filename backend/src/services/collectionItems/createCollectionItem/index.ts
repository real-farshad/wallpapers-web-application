import { User } from '@src/models/userModel';
import checkCollectionExists from './checkCollectionExists';
import checkWallpaperExists from './checkWallpaperExists';
import validateCollectionItem from './validateCollectionItem';
import saveCollectionItem from '@src/repositories/collectionItems/saveCollectionItem';
import checkUserIsCollectionPublisher from './checkUserIsCollectionPublisher';
import incCollectionWallpaperCount from './incCollectionWallpaperCount';
import addNewCollectionItemFields from './addNewCollectionItemFields';
import checkCollectionItemAlreadyExist from './checkCollectionItemAlreadyExist';

export interface CollectionItemPayload {
  collectionId: string;
  wallpaperId: string;
}

const createCollectionItem = async (collectionItem: CollectionItemPayload, user: User) => {
  collectionItem = validateCollectionItem(collectionItem);

  await checkCollectionItemAlreadyExist(collectionItem);

  const wallpaperId = collectionItem.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const collectionId = collectionItem.collectionId;
  const collection = await checkCollectionExists(collectionId);
  await checkUserIsCollectionPublisher(collection, user);

  const newCollectionItem = await addNewCollectionItemFields(collectionItem);

  const savedCollectionItem = await saveCollectionItem(newCollectionItem);

  await incCollectionWallpaperCount(collectionId);

  return savedCollectionItem;
};

export default createCollectionItem;
