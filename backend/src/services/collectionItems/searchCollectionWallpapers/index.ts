import refineQueryFields from './refineQueryFields';
import validateCollectionId from './validateCollectionItemId';
import validateQuery from './validateQuery';
import queryWallpapersInDatabase from './queryWallpapersInDatabase';
import checkCollectionExists from './checkCollectionExists';

export interface queryInput {
  page?: number;
  limit?: number;
}

const searchCollectionWallpapers = async (collectionId: string, query: queryInput, user: any) => {
  collectionId = validateCollectionId(collectionId);

  query = validateQuery(query);

  query = refineQueryFields(query);

  await checkCollectionExists(collectionId);

  const wallpapers = await queryWallpapersInDatabase(collectionId, query, user);
  return wallpapers;
};

export default searchCollectionWallpapers;
