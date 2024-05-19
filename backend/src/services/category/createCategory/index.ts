import validateCategory from './validateCategory';
import checkCategoryExists from './checkCategoryExists';
import saveCategory from '@repositories/category/saveCategory';

export interface CategoryPayload {
  title: string;
}

const createCategory = async (category: CategoryPayload) => {
  category = validateCategory(category);

  await checkCategoryExists(category.title);

  const savedCategory = await saveCategory(category);
  return savedCategory;
};

export default createCategory;
