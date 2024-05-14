import { getDB } from '@src/db';
import { Collection } from 'mongodb';

const getCollectionItemsCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('collection-items');
};

export default getCollectionItemsCollection;
