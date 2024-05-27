import findCategoryByTitle from '@src/repositories/category/findCategoryByTitle';
import { CustomError } from '@src/utils/CustomError';
import { WallpaperUpdate } from '.';

const modifyUpdate = async (update: WallpaperUpdate) => {
  if (!update.category) return update;

  const newUpdate: any = { ...update };

  const categoryTitle = newUpdate.category;
  const category = await findCategoryByTitle(categoryTitle);

  if (!category) {
    const errorStatus = 404;
    const errorMessage = "A category with this title doesn't exist!";
    throw new CustomError(errorStatus, errorMessage);
  }

  delete newUpdate.category;
  newUpdate.categoryId = category._id;

  return newUpdate;
};

export default modifyUpdate;
