import validateCategoriesQuery from './validateCategoriesQuery';
import modifyCategoriesQuery from './modifyCategoriesQuery';
import findCategories from '@repositories/category/findCategories';

export interface CategoriesQuery {
  page?: number;
  limit?: number;
}

const search = async (query: CategoriesQuery) => {
  query = validateCategoriesQuery(query);

  query = modifyCategoriesQuery(query);

  const categories = await findCategories(query);
  return categories;
};

export default search;
