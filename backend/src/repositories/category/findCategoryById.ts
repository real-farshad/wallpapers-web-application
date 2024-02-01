import { ObjectId } from 'mongodb';
import getCategoriesCollection from './getCategoriesCollection';

const findCategoryById = async (id: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ _id: new ObjectId(id) });
  return category;
};

export default findCategoryById;
