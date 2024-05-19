import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';
import { Category } from '@src/models/categoryModel';

const findCategoryById = async (id: string): Promise<Category | undefined> => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ _id: new ObjectId(id) });
  return category;
};

export default findCategoryById;
