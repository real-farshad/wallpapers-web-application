import { ObjectId } from 'mongodb';

export interface CollectionItem {
  _id?: ObjectId;
  createdAt: number;
  collectionId: ObjectId;
  wallpaperId: ObjectId;
}

export interface CollectionItemPayload {
  collectionId: string;
  wallpaperId: string;
}

export interface CollectionItemsQuery {
  page?: number;
  limit?: number;
}
