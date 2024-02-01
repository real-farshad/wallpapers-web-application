import getCategoriesCollection from './getCategoriesCollection';

const findCategoryByTitle = async (title: string) => {
  const categoriesCollection = await getCategoriesCollection();
  const category = await categoriesCollection.findOne({ title });
  return category;
};

export default findCategoryByTitle;
