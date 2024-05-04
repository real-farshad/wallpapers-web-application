import findCategoryByTitle from '@repositories/category/findCategoryByTitle';
import { CustomError } from '@utils/CustomError';

const verifyUniqueNewCategoryTitle = async (title: string) => {
  const category = await findCategoryByTitle(title);

  if (category) {
    const errorStatus = 400;
    const errorMessage = 'A category with this title already exists!';
    throw new CustomError(errorStatus, errorMessage);
  }
};

export default verifyUniqueNewCategoryTitle;
