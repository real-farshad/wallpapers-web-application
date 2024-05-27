import findCategoryByTitle from '@repositories/category/findCategoryByTitle';
import { CustomError } from '@utils/CustomError';

const ensureNewCategoryIsUnique = async (title: string) => {
  const category = await findCategoryByTitle(title);

  if (category) {
    const errorStatus = 409;
    const errorMessage = 'The new category already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default ensureNewCategoryIsUnique;
