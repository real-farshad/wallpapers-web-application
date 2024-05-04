import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const validateCategoryId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    const errorStatus = 400;
    const errorMessage = 'Invalid category id!';
    throw new CustomError(errorStatus, errorMessage);
  }

  return id;
};

export default validateCategoryId;
