import findCategoryByTitle from '@repositories/category/findCategoryByTitle';
import { CustomError } from '@utils/CustomError';

const checkCategoryExists = async (title: string) => {
  const sameCategory = await findCategoryByTitle(title);

  if (sameCategory) {
    const errorStatus = 400;
    const errorMessage = 'A category with this title already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default checkCategoryExists;
