import findCollectionItemById from '@src/repositories/collectionItems/findCollectionItemById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureCollectionItemExists = async (collectionItemId: string) => {
  const collectionItemObjectId = new ObjectId(collectionItemId);
  const collectionItem = await findCollectionItemById(collectionItemObjectId);

  if (!collectionItem) {
    const errorStatus = 404;
    const errorMessage = `A collection item with this id doesn't exist!`;
    throw new CustomError(errorStatus, errorMessage);
  }

  return collectionItem;
};

export default ensureCollectionItemExists;
