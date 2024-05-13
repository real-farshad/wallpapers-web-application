import { ObjectId } from 'mongodb';

interface Like {
  _id: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}

export { Like };
