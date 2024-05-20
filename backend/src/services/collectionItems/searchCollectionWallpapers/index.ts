import refineQueryFields from './refineQueryFields';
import validateCollectionId from './validateCollectionId';
import validateQuery from './validateQuery';
import queryWallpapersInDatabase from './queryWallpapersInDatabase';
import checkCollectionExists from './checkCollectionExists';
import { User } from '@src/models/userModel';

export interface CollectionItemsQuery {
  page?: number;
  limit?: number;
}

const searchCollectionWallpapers = async (
  collectionId: string,
  query: CollectionItemsQuery,
  user?: User
) => {
  collectionId = validateCollectionId(collectionId);

  query = validateQuery(query);

  query = refineQueryFields(query);

  await checkCollectionExists(collectionId);

  const wallpapers = await queryWallpapersInDatabase(collectionId, query, user);
  return wallpapers;
};

export default searchCollectionWallpapers;
