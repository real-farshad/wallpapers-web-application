import findUserCollectionByTitle from '@src/repositories/collections/findUserCollectionByTitle';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const verifyUniqueCollectionTitle = async (collectionTitle: string, userId: ObjectId) => {
  const collection = await findUserCollectionByTitle(collectionTitle, userId);

  if (collection) {
    const errorStatus = 400;
    const errorMessage = 'Collection title already exists';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default verifyUniqueCollectionTitle;
