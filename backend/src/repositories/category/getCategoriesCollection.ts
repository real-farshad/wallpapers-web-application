import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getCategoriesCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('categories');
};

export default getCategoriesCollection;
