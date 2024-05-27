import { Category } from '@src/models/categoryModel';
import getCategoriesCollection from './getCategoriesCollection';

const findCategoryByTitle = async (title: string): Promise<Category | undefined> => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({
    title: { $regex: new RegExp(`^${title}$`, 'i') },
  });

  return category;
};

export default findCategoryByTitle;
