import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getLikesCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('likes');
};

export default getLikesCollection;
