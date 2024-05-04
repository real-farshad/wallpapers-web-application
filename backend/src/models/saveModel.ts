import { ObjectId } from 'mongodb';

interface Save {
  _id: ObjectId;
  wallpaperId: ObjectId;
  userId: ObjectId;
  createdAt: number;
}

export { Save };
