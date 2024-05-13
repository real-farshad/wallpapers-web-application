import findCategoryByTitle from '@src/repositories/category/findCategoryByTitle';
import { CustomError } from '@src/utils/CustomError';

const checkCategoryUpdate = async (update: any) => {
  if (!update.category) return update;

  const newUpdate = { ...update };
  const category = await findCategoryByTitle(newUpdate.category);

  if (!category) {
    const errorStatus = 404;
    const errorMessage = "A category with this title doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  delete newUpdate.category;
  newUpdate.categoryId = category._id;

  return newUpdate;
};

export default checkCategoryUpdate;
