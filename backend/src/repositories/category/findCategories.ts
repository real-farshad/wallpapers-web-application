import { Category } from '@models/categoryModel';
import getCategoriesCollection from './getCategoriesCollection';

const findCategories = async (query: any): Promise<Category[]> => {
  const { skip, limit } = query;

  const categoriesCollection = await getCategoriesCollection();
  const categories = await categoriesCollection
    .find()
    .sort({ title: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  return categories;
};

export default findCategories;
