import { Category } from '@models/categoryModel';
import getCategoriesCollection from './getCategoriesCollection';

const findCategoriesByQuery = async (query: any): Promise<Category[]> => {
  const defaultPage = 1;
  const defaultLimit = 10;

  let { page = defaultPage, limit = defaultLimit } = query;
  page = Math.max(page, defaultPage);
  limit = Math.max(limit, 1);

  const skip = (page - 1) * limit;

  const categoriesCollection = await getCategoriesCollection();
  const categories = await categoriesCollection
    .find()
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return categories;
};

export default findCategoriesByQuery;
