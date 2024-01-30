import { CustomError } from '@src/utils/CustomError';
import { validateQueryCategory } from '../validations/categoryValidation';
import { findCategoriesWithQuery } from '../models/categoryModel';

const queryCategories = async (query: any) => {
  const { error, validQuery } = validateQueryCategory(query);
  if (error) throw new CustomError(400, error);

  const categories = await findCategoriesWithQuery(validQuery);
  return categories;
};

export { queryCategories };
