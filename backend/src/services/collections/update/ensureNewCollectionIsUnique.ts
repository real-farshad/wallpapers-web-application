import findUserCollectionByTitle from '@src/repositories/collections/findUserCollectionByTitle';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureNewCollectionIsUnique = async (collectionTitle: string, userId: ObjectId) => {
  const collection = await findUserCollectionByTitle(collectionTitle, userId);

  if (collection) {
    const errorStatus = 409;
    const errorMessage = 'The new Collection title already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureNewCollectionIsUnique;
