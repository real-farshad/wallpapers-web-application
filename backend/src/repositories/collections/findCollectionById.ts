import { ObjectId } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const findCollectionById = async (id: string) => {
  const collectionsCollection = await getCollectionsCollection();
  const collection = await collectionsCollection.findOne({ _id: new ObjectId(id) });
  return collection;
};

export default findCollectionById;
