import { ObjectId } from 'mongodb';
import { getDB } from '@src/db';
import { User } from './userModel';

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

export { findUserById, findUserByEmail, findUserByProviderId, createUser };
