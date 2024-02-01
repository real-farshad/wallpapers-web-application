import { CustomError } from '@utils/CustomError';
import validateId from '@validations/validateId';
import deleteCategoryById from '@repositories/category/deleteCategoryById';

const deleteCategory = async (id: string) => {
  const { error, validId } = validateId(id);
  if (error) throw new CustomError(400, error);

  const success = await deleteCategoryById(validId || '');
  if (!success) throw new CustomError(404, "A category with this id doesn't exist!");
};

export default deleteCategory;
