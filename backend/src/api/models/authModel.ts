import { ObjectId } from 'mongodb';
import { getDB } from '@src/db';

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

const findUserById = async (id: string) => {
  const usersCollection = await getUsersCollection();
  return usersCollection.findOne({ _id: new ObjectId(id) });
};

const findUserByEmail = async (email: string) => {
  const usersCollection = await getUsersCollection();
  return usersCollection.findOne({ email });
};

const findUserByProviderId = async (providerId: string) => {
  const usersCollection = await getUsersCollection();
  return usersCollection.findOne({ providerId: providerId });
};

const createUser = async (user: User) => {
  const usersCollection = await getUsersCollection();
  return usersCollection.insertOne(user);
};

export { User };
export { findUserById, findUserByEmail, findUserByProviderId, createUser };
