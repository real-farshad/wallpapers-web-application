import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getCommentsCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('comments');
};

export default getCommentsCollection;
