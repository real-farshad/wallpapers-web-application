import { CollectionItemPayload } from '@src/models/collectionItemModel';
import addNewFields from '@src/services/auth/signupLocalUser/addNewFields';
import checkCollectionExists from './checkCollectionExists';
import checkWallpaperExists from './checkWallpaperExists';
import validateCollectionItem from './validateCollectionItem';
import saveCollectionItem from '@src/repositories/collectionItems/saveCollectionItem';
import checkUserIsCollectionPublisher from './checkUserIsCollectionPublisher';
import incCollectionWallpaperCount from './incCollectionWallpaperCount';
import { User } from '@src/models/userModel';

const createCollectionItem = async (collectionItem: CollectionItemPayload, user: User) => {
  validateCollectionItem(collectionItem);

  const wallpaperId = collectionItem.wallpaperId;
  await checkWallpaperExists(wallpaperId);

  const collectionId = collectionItem.collectionId;
  const collection = await checkCollectionExists(collectionId);

  await checkUserIsCollectionPublisher(collection, user);

  const newCollectionItem = await addNewFields(collectionItem);

  const savedCollectionItem = await saveCollectionItem(newCollectionItem);

  await incCollectionWallpaperCount(collectionId);

  return savedCollectionItem;
};

export default createCollectionItem;
