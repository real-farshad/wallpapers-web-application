import deleteCollectionFromDatabase from './deleteCollectionFromDatabase';
import validateCollectionId from './validateCollectionId';
import checkCollectionExist from './checkCollectionExist';
import deleteCollectionItems from './deleteCollectionItems';
import composeResult from './composeResult';

const deleteCollection = async (collectionId: string, user: any) => {
  collectionId = validateCollectionId(collectionId);

  const userId = user._id;
  const collection = await checkCollectionExist(collectionId, userId);

  const deleteCount = await deleteCollectionItems(collectionId);

  await deleteCollectionFromDatabase(collectionId);

  const result = composeResult(collection, deleteCount);
  return result;
};

export default deleteCollection;
