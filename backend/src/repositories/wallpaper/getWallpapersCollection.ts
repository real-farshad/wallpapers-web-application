import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getWallpapersCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('wallpapers');
};

export default getWallpapersCollection;
