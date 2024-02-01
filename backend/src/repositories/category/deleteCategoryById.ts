import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';

const deleteCategoryById = async (id: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) return { success: false };
  return { success: true };
};

export default deleteCategoryById;
