import getCategoriesCollection from './getCategoriesCollection';
import { Category } from '@src/models/categoryModel';
import { ObjectId } from 'mongodb';

const updateCategoryById = async (
  id: ObjectId,
  update: Category
): Promise<Category | undefined> => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.findOneAndUpdate(
    { _id: id },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateCategoryById;
