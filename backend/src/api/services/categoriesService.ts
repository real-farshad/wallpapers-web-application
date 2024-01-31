import { CustomError } from '@src/utils/CustomError';
import {
  validateCreateCategory,
  validateQueryCategories,
  validateUpdateCategory,
} from '@validations/categoriesValidation';
import {
  findCategoryByTitle,
  saveCategory,
  findCategoriesByQuery,
  deleteCategoryById,
  Category,
  findCategoryById,
  updateCategoryById,
} from '@models/categories';
import { validateId } from '../validations/commonValidation';

const createCategory = async (category: any) => {
  const { error, validCategory } = validateCreateCategory(category);
  if (error) throw new CustomError(400, error);

  const sameCategory = await findCategoryByTitle(validCategory.title);
  if (sameCategory) throw new CustomError(400, 'A category with this title already exists!');

  const savedCategory = await saveCategory(validCategory);
  return savedCategory;
};

const queryCategories = async (query: any) => {
  const { error, validQuery } = validateQueryCategories(query);
  if (error) throw new CustomError(400, error);

  const categories = await findCategoriesByQuery(validQuery);
  return categories;
};

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

const deleteCategory = async (id: string) => {
  const { error, validId } = validateId(id);
  if (error) throw new CustomError(400, error);

  const success = await deleteCategoryById(validId || '');
  if (!success) throw new CustomError(404, "A category with this id doesn't exist!");
};

export { createCategory, queryCategories, updateCategory, deleteCategory };
