import findCategoryById from '@repositories/category/findCategoryById';
import { CustomError } from '@utils/CustomError';
import { ObjectId } from 'mongodb';

const ensureCategoryExists = async (categoryId: string) => {
  const categoryObjectId = new ObjectId(categoryId);
  const category = await findCategoryById(categoryObjectId);

  if (!category) {
    const errorStatus = 404;
    const errorMessage = "A category with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return category;
};

export default ensureCategoryExists;
