import { CustomError } from '@utils/CustomError';
import { Category } from '@models/categoryModel';
import validateId from '@validations/validateId';
import validateUpdateCategory from '@validations/category/validateUpdateCategory';
import findCategoryById from '@repositories/category/findCategoryById';
import findCategoryByTitle from '@repositories/category/findCategoryByTitle';
import updateCategoryById from '@repositories/category/updateCategoryById';

const updateCategory = async (id: string, update: Category) => {
  const { error: idError, validId } = validateId(id);
  if (idError) throw new CustomError(400, idError);

  const { error: updateError, validUpdate } = validateUpdateCategory(update);
  if (updateError) throw new CustomError(400, updateError);

  const currentCategory = await findCategoryById(validId || '');
  if (!currentCategory) throw new CustomError(404, "A category with this id doesn't exist!");

  if (currentCategory.title === validUpdate.title)
    throw new CustomError(400, `The category title is already "${currentCategory.title}".`);

  const sameCategory = await findCategoryByTitle(validUpdate.title);
  if (sameCategory) throw new CustomError(400, 'A category with this title already exists!');

  const updateCategory = await updateCategoryById(validId || '', validUpdate);
  return updateCategory;
};

export default updateCategory;
