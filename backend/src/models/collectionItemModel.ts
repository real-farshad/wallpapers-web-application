import { ObjectId } from 'mongodb';

interface CollectionItem {
  _id?: ObjectId;
  createdAt: number;
  collectionId: ObjectId;
  wallpaperId: ObjectId;
}

export { CollectionItem };
