import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const validateCollectionItemId = (id: string) => {
  const trimmedId = id.trim();
  const isValidId = ObjectId.isValid(trimmedId);

  if (!isValidId) {
    const errorStatus = 400;
    const errorMessage = 'Invalid collection item id!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return trimmedId;
};

export default validateCollectionItemId;
