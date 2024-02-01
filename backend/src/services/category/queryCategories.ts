import { CustomError } from '@utils/CustomError';
import validateQueryCategories from '@validations/validateQueryCategories';
import findCategoriesByQuery from '@repositories/category/findCategoriesByQuery';

const queryCategories = async (query: any) => {
  const { error, validQuery } = validateQueryCategories(query);
  if (error) throw new CustomError(400, error);

  const categories = await findCategoriesByQuery(validQuery);
  return categories;
};

export default queryCategories;
