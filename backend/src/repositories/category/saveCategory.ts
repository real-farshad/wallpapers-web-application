import getCategoriesCollection from './getCategoriesCollection';

const saveCategory = async (category: any) => {
  const categoriesCollection = await getCategoriesCollection();
  const result = await categoriesCollection.insertOne(category);
  const savedCategory = { _id: result.insertedId, ...category };
  return savedCategory;
};

export default saveCategory;
