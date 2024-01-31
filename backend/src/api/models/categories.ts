import { getDB } from '@src/db';
import { Collection, ObjectId } from 'mongodb';

interface Category {
  _id: string;
  title: string;
}

const getCategoriesCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('categories');
};

const findCategoryByTitle = async (title: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ title });
  return category;
};

const saveCategory = async (category: any) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.insertOne(category);
  const savedCategory = { _id: result.insertedId, ...category };
  return savedCategory;
};

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

const findCategoryById = async (id: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ _id: new ObjectId(id) });
  return category;
};

const updateCategoryById = async (id: string, update: any) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result.value;
};

const deleteCategoryById = async (id: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) return { success: false };
  return { success: true };
};

export { Category };
export {
  findCategoryByTitle,
  saveCategory,
  findCategoriesByQuery,
  findCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
