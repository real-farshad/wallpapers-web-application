import validateCategory from './validateCategory';
import checkCategoryExists from './checkCategoryExists';
import saveCategory from '@repositories/category/saveCategory';

interface CategoryInput {
  title: string;
}

const createCategory = async (category: CategoryInput) => {
  category = validateCategory(category);

  await checkCategoryExists(category.title);

  const savedCategory = await saveCategory(category);
  return savedCategory;
};

export default createCategory;
