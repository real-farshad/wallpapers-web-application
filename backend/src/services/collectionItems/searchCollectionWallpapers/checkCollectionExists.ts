import findCollectionById from '@src/repositories/collections/findCollectionById';
import { CustomError } from '@src/utils/CustomError';

const checkCollectionExists = async (collectionId: string) => {
  const collection = await findCollectionById(collectionId);

  if (!collection) {
    const errorStatus = 404;
    const errorMessage = "A collection with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkCollectionExists;
