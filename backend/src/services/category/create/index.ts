import validateCategory from './validateCategory';
import ensureCategoryIsUnique from './ensureCategoryIsUnique';
import insertCategory from '@repositories/category/insertCategory';

export interface CategoryPayload {
  title: string;
}

const create = async (category: CategoryPayload) => {
  category = validateCategory(category);

  await ensureCategoryIsUnique(category.title);

  const savedCategory = await insertCategory(category);
  return savedCategory;
};

export default create;
