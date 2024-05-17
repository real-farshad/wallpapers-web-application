import { ObjectId } from 'mongodb';

export interface Collection {
  _id?: ObjectId;
  title: string;
  createdAt: number;
  wallpaperCount: number;
  userId: ObjectId;
}

export interface CollectionPayload {
  title: string;
}

export interface CollectionUpdate {
  title: string;
}

export interface CollectionsQuery {
  title?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
