import { getDB } from '@src/db';

interface Category {
  _id: string;
  title: string;
}

const getCategoriesCollection = async () => {
  const db = await getDB();
  return db.collection('categories');
};

const findCategoriesWithQuery = async (query: any) => {
  const { page, limit } = query;

  const categoriesCollection = await getCategoriesCollection();
  const categories = categoriesCollection
    .find()
    .sort({ title: 1 })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit > 0 ? limit : 10)
    .toArray();

  return categories;
};

export { Category };
export { findCategoriesWithQuery };
