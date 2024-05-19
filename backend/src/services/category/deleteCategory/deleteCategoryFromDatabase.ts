import deleteCategoryById from '@src/repositories/category/deleteCategoryById';
import { CustomError } from '@src/utils/CustomError';

const deleteCategoryFromDatabase = async (categoryId: string) => {
  const success = await deleteCategoryById(categoryId);

  if (!success) {
    const errorStatus = 400;
    const errorMessage = "A category with this id doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  return { success: true };
};

export default deleteCategoryFromDatabase;
