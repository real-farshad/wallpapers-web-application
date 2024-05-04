import { ObjectId } from 'mongodb';
interface Category {
  _id?: ObjectId;
  title: string;
}

export { Category };
