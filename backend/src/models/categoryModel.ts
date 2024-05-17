import { ObjectId } from 'mongodb';
export interface Category {
  _id?: ObjectId;
  title: string;
}

export interface CategoryPayload {
  title: string;
}

export interface CategoryUpdate {
  title: string;
}

export interface CategoriesQuery {
  page?: number;
  limit?: number;
}
