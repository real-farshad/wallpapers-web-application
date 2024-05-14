import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getSavesCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('saves');
};

export default getSavesCollection;
