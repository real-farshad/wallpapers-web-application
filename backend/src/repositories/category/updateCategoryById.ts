import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';

const updateCategoryById = async (id: string, update: any) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update },
    { returnDocument: 'after' }
  );

  return result.value;
};

export default updateCategoryById;
