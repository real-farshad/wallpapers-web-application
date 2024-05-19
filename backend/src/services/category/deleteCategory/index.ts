import validateCategoryId from './validateCategoryId';
import deleteCategoryFromDatabase from './deleteCategoryFromDatabase';

const deleteCategory = async (categoryId: string) => {
  categoryId = validateCategoryId(categoryId);

  const result = await deleteCategoryFromDatabase(categoryId);
  return result;
};

export default deleteCategory;
