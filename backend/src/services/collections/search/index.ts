import findCollections from '@src/repositories/collections/findCollections';
import modifyCollectionsQuery from './modifyCollectionsQuery';
import validateCollectionsQuery from './validateCollectionsQuery';

export interface CollectionsQuery {
  title?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

const search = async (query: CollectionsQuery) => {
  query = validateCollectionsQuery(query);

  query = modifyCollectionsQuery(query);

  const result = await findCollections(query);
  return result;
};

export default search;
