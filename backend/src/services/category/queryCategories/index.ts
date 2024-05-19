import findCategoriesByQuery from '@repositories/category/findCategoriesByQuery';
import validateCategoriesQuery from './validateCategoriesQuery';
import refineQueryFields from './refineQueryFields';

export interface CategoriesQuery {
  page?: number;
  limit?: number;
}

const queryCategories = async (query: CategoriesQuery) => {
  query = validateCategoriesQuery(query);

  query = refineQueryFields(query);

  const categories = await findCategoriesByQuery(query);
  return categories;
};

export default queryCategories;
