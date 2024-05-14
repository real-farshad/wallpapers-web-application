import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getCollectionsCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('collections');
};

export default getCollectionsCollection;
