import { CollectionPayload } from '@src/models/collectionModel';
import { ObjectId } from 'mongodb';

const addNewFields = (collection: CollectionPayload, userId: ObjectId) => {
  const newCollection: any = { ...collection };

  newCollection.wallpaperCount = 0;
  newCollection.createdAt = Date.now();
  newCollection.publisherId = userId;

  return newCollection;
};

export default addNewFields;
