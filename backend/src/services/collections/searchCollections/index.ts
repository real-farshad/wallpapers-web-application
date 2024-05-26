import queryCollections from '@src/repositories/collections/queryCollections';
import refineQueryFields from './refineQueryFields';
import validateCollectionsQuery from './validateCollectionsQuery';

export interface CollectionsQuery {
  title?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

const searchCollections = async (query: CollectionsQuery) => {
  query = validateCollectionsQuery(query);

  query = refineQueryFields(query);

  const result = await queryCollections(query);
  return result;
};

export default searchCollections;
