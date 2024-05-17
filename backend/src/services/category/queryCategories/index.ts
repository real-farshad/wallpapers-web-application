import { CategoriesQuery } from '@src/models/categoryModel';
import findCategoriesByQuery from '@repositories/category/findCategoriesByQuery';
import validateCategoriesQuery from './validateCategoriesQuery';

const queryCategories = async (query: CategoriesQuery) => {
  query = validateCategoriesQuery(query);

  const categories = await findCategoriesByQuery(query);
  return categories;
};

export default queryCategories;
