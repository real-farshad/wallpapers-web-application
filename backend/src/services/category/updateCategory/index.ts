import updateCategoryById from '@repositories/category/updateCategoryById';
import validateCategoryId from './validateCategoryId';
import verifyUniqueNewCategoryTitle from './verifyUniqueNewCategoryTitle';
import checkCategoryExists from './checkCatagoryExists';
import validateCategoryUpdate from './validateCategoryUpdate';

interface updateCategoryInput {
  title: string;
}

const updateCategory = async (id: string, categoryUpdate: updateCategoryInput) => {
  id = validateCategoryId(id);
  categoryUpdate = validateCategoryUpdate(categoryUpdate);

  await checkCategoryExists(id);

  await verifyUniqueNewCategoryTitle(categoryUpdate.title);

  const updatedCategory = await updateCategoryById(id, categoryUpdate);
  return updatedCategory;
};

export default updateCategory;
