import updateCategoryById from '@repositories/category/updateCategoryById';
import validateCategoryId from './validateCategoryId';
import verifyUniqueNewCategoryTitle from './verifyUniqueNewCategoryTitle';
import checkCategoryExists from './checkCatagoryExists';
import validateCategoryUpdate from './validateCategoryUpdate';

export interface CategoryUpdate {
  title: string;
}

const updateCategory = async (categoryId: string, udpate: CategoryUpdate) => {
  categoryId = validateCategoryId(categoryId);
  udpate = validateCategoryUpdate(udpate);

  await checkCategoryExists(categoryId);

  await verifyUniqueNewCategoryTitle(udpate.title);

  const updatedCategory = await updateCategoryById(categoryId, udpate);
  return updatedCategory;
};

export default updateCategory;
