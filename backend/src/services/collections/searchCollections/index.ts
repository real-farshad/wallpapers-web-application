import { CollectionsQuery } from '@src/models/collectionModel';
import queryCollections from '@src/repositories/collections/queryCollections';
import refineQueryFields from './refineQueryFields';
import validateCollectionsQuery from './validateCollectionsQuery';

const searchCollections = async (query: CollectionsQuery) => {
  query = validateCollectionsQuery(query);

  query = refineQueryFields(query);

  const collections = await queryCollections(query);
  return collections;
};

export default searchCollections;
