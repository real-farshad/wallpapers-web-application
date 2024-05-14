import { collectionInput } from '.';
import { ObjectId } from 'mongodb';

const addNewFields = (collection: collectionInput, userId: string) => {
  const newCollection: any = { ...collection };

  newCollection.wallpaperCount = 0;
  newCollection.createdAt = Date.now();
  newCollection.publisherId = new ObjectId(userId);

  return newCollection;
};

export default addNewFields;
