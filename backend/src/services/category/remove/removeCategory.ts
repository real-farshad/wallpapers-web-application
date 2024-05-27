import deleteCategoryById from '@src/repositories/category/deleteCategoryById';
import { CustomError } from '@src/utils/CustomError';
import { ObjectId } from 'mongodb';

const removeCategory = async (categoryId: string) => {
  const categoryObjectId = new ObjectId(categoryId);
  const success = await deleteCategoryById(categoryObjectId);

  if (!success) {
    const errorStatus = 404;
    const errorMessage = "A category with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default removeCategory;
