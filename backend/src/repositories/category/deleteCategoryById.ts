import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';

const deleteCategoryById = async (id: ObjectId): Promise<boolean> => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.deleteOne({ _id: id });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteCategoryById;
