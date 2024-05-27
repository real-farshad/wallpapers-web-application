import ensureCategoryExists from './ensureCategoryExists';
import ensureNewCategoryIsUnique from './ensureNewCategoryIsUnique';
import validateCategoryUpdate from './validateCategoryUpdate';
import updateCategory from './updateCategory';
import validateCategoryId from '../validateCategoryId';

export interface CategoryUpdate {
  title: string;
}

const update = async (categoryId: string, udpate: CategoryUpdate) => {
  categoryId = validateCategoryId(categoryId);
  udpate = validateCategoryUpdate(udpate);

  await ensureCategoryExists(categoryId);

  await ensureNewCategoryIsUnique(udpate.title);

  const updatedCategory = await updateCategory(categoryId, udpate);
  return updatedCategory;
};

export default update;
