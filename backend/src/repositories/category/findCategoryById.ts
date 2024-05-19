import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';
import { Category } from '@src/models/categoryModel';

const findCategoryById = async (id: ObjectId): Promise<Category | undefined> => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ _id: id });
  return category;
};

export default findCategoryById;
