import findCategoriesByQuery from '@repositories/category/findCategoriesByQuery';
import validateCategoriesQuery from './validateCategoriesQuery';

interface queryCategoriesInput {
  page?: number;
  limit?: number;
}

const queryCategories = async (query: queryCategoriesInput) => {
  query = validateCategoriesQuery(query);

  const categories = await findCategoriesByQuery(query);
  return categories;
};

export default queryCategories;
