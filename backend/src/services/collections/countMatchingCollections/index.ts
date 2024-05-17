import countQueryResults from '@src/repositories/collections/countQueryResults';
import refineQueryFields from './refineQueryFields';
import validateQuery from './validateQuery';

export interface queryInput {
  title?: string;
  startDate?: string;
  endDate?: string;
}

const countMatchingCollections = async (query: queryInput) => {
  query = validateQuery(query);

  query = refineQueryFields(query);

  const result = await countQueryResults(query);
  return result;
};

export default countMatchingCollections;
