import { getDB } from '@src/db';
import { Collection, ObjectId } from 'mongodb';

interface User {
  _id?: ObjectId;
  avatar?: string;
  username: string;
  email?: string;
  password?: string;
  provider: string;
  providerId?: string;
}

const getUsersCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('users');
};

const deleteUserById = async (id: ObjectId) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.deleteOne({ _id: id });
};

export { User };
export { deleteUserById };
