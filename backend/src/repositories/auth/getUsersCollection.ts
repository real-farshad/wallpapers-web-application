import { Collection } from 'mongodb';
import { getDB } from '@src/db';

const getUsersCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('users');
};

export default getUsersCollection;
