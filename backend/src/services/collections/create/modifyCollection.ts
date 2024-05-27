import { ObjectId } from 'mongodb';
import { CollectionPayload } from '.';

const modifyCollection = (collection: CollectionPayload, userId: ObjectId) => {
  const newCollection: any = { ...collection };

  newCollection.wallpaperCount = 0;
  newCollection.createdAt = Date.now();
  newCollection.publisherId = userId;

  return newCollection;
};

export default modifyCollection;
