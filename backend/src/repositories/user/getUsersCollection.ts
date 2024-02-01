import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getUsersCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('users');
};

export default getUsersCollection;
