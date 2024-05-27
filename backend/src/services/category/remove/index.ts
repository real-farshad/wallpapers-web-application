import validateCategoryId from '../validateCategoryId';
import removeCategory from './removeCategory';

const remove = async (categoryId: string) => {
  categoryId = validateCategoryId(categoryId);

  const result = await removeCategory(categoryId);
  return result;
};

export default remove;
