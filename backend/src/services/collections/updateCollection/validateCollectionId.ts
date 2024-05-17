import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const validateCollectionId = (id: string) => {
  if (!id) {
    const errorStatus = 400;
    const errorMessage = 'Collection id is required!';
    throw new CustomError(errorStatus, errorMessage);
  }

  const trimmedId = id.trim();
  const isValidId = ObjectId.isValid(trimmedId);

  if (!isValidId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid collection id!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return trimmedId;
};

export default validateCollectionId;
