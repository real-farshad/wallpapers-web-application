import { CustomError } from '@utils/CustomError';
import { Category } from '@models/categoryModel';
import validateCreateCategory from '@validations/category/validateCreateCategory';
import findCategoryByTitle from '@repositories/category/findCategoryByTitle';
import saveCategory from '@repositories/category/saveCategory';

const createCategory = async (category: Category) => {
  const { error, validCategory } = validateCreateCategory(category);
  if (error) throw new CustomError(400, error);

  const sameCategory = await findCategoryByTitle(validCategory.title);
  if (sameCategory) throw new CustomError(400, 'A category with this title already exists!');

  const savedCategory = await saveCategory(validCategory);
  return savedCategory;
};

export default createCategory;
