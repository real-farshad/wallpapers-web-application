import validateCategoryId from './validateCategoryId';
import deleteCategoryFromDatabase from './deleteCategoryFromDatabase';

const deleteCategory = async (id: string) => {
  id = validateCategoryId(id);

  const result = await deleteCategoryFromDatabase(id);
  return result;
};

export default deleteCategory;
