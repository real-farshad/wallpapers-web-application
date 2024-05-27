import modifyCollectionItemsQuery from './modifyCollectionItemsQuery';
import validateCollectionId from '../../common/validateCollectionId';
import validateCollectionItemsQuery from './validateCollectionItemsQuery';
import searchCollectionItems from './searchCollectionItems';
import { User } from '@src/models/userModel';
import ensureCollectionExists from '../ensureCollectionExists';

export interface CollectionItemsQuery {
  page?: number;
  limit?: number;
}

const search = async (collectionId: string, query: CollectionItemsQuery, user?: User) => {
  collectionId = validateCollectionId(collectionId);

  query = validateCollectionItemsQuery(query);

  query = modifyCollectionItemsQuery(query);

  await ensureCollectionExists(collectionId);

  const wallpapers = await searchCollectionItems(collectionId, query, user);
  return wallpapers;
};

export default search;
