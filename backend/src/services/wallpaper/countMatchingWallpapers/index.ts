import countQueryResults from '@src/repositories/wallpaper/countQueryResults';
import refineQueryFields from './refineQueryFields';
import validateQuery from './validateQuery';

export interface queryInput {
  title?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

const countMatchingWallpapers = async (query: queryInput) => {
  query = validateQuery(query);

  query = refineQueryFields(query);

  const result = await countQueryResults(query);
  return result;
};

export default countMatchingWallpapers;
