import getCategoriesCollection from './getCategoriesCollection';
import { Category } from '@src/models/categoryModel';
import { ObjectId } from 'mongodb';

const updateCategoryById = async (id: string, update: Category) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateCategoryById;
