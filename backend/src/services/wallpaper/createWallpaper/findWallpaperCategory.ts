import findCategoryByTitle from '@src/repositories/category/findCategoryByTitle';
import { CustomError } from '@src/utils/CustomError';

const findWallpaperCategory = async (categoryTitle: string) => {
  const category = await findCategoryByTitle(categoryTitle);

  if (!category) {
    const errorStatus = 404;
    const errorMessage = `A category with this id doesn't exist!`;
    throw new CustomError(errorStatus, errorMessage);
  }

  return category;
};

export default findWallpaperCategory;
