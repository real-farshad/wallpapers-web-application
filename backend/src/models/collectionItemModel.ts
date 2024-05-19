import { ObjectId } from 'mongodb';

export interface CollectionItem {
  _id?: ObjectId;
  createdAt: number;
  collectionId: ObjectId;
  wallpaperId: ObjectId;
}
