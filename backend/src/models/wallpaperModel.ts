import { ObjectId } from 'mongodb';

export interface Wallpaper {
  _id?: ObjectId;
  image: {
    thumbnail: string;
    large: string;
  };
  title: string;
  likeCount: number;
  createdAt: number;
  categoryId: ObjectId;
  publisherId: ObjectId;
}

export interface WallpaperPayload {
  image: {
    thumbnail: string;
    large: string;
  };
  title: string;
  category: string;
}

export interface WallpaperUpdate {
  image?: {
    thumbnail?: string;
    large?: string;
  };
  title?: string;
  category?: string;
}

export interface WallpapersQuery {
  title?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
