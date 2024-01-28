import { getDB } from '@src/db';
import { ObjectId } from 'mongodb';

interface User {
  _id?: ObjectId;
  avatar?: string;
  username: string;
  email?: string;
  password?: string;
  provider: string;
  providerId?: string;
}

const getUsersCollection = async () => {
  const db = await getDB();
  return db.collection('users');
};

const deleteUser = async (id: string) => {
  const usersCollection = await getUsersCollection();
  return usersCollection.deleteOne({ _id: id });
};

export { User };
export { deleteUser };
