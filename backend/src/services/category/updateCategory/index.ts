import validateCategoryId from './validateCategoryId';
import verifyUniqueNewCategoryTitle from './verifyUniqueNewCategoryTitle';
import checkCategoryExists from './checkCatagoryExists';
import validateCategoryUpdate from './validateCategoryUpdate';
import updateCategoryInDatabase from './updateCategoryInDatabase';

export interface CategoryUpdate {
  title: string;
}

const updateCategory = async (categoryId: string, udpate: CategoryUpdate) => {
  categoryId = validateCategoryId(categoryId);
  udpate = validateCategoryUpdate(udpate);

  await checkCategoryExists(categoryId);

  await verifyUniqueNewCategoryTitle(udpate.title);

  const updatedCategory = await updateCategoryInDatabase(categoryId, udpate);
  return updatedCategory;
};

export default updateCategory;
