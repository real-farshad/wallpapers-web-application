import { ObjectId } from 'mongodb';
import { CollectionItemPayload } from '.';
import { CustomError } from '@src/utils/CustomError';
import findCollectionItem from '@src/repositories/collectionItems/findCollectionItem';

const checkCollectionItemAlreadyExist = async (collectionItem: CollectionItemPayload) => {
  const wallpaperId = new ObjectId(collectionItem.wallpaperId);
  const collectionId = new ObjectId(collectionItem.collectionId);
  const sameCollectionItem = await findCollectionItem(wallpaperId, collectionId);

  if (sameCollectionItem) {
    const errorStatus = 409;
    const errorMessage = 'Collection item already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkCollectionItemAlreadyExist;
