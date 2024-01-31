import { Collection, ObjectId } from 'mongodb';
import { getDB } from '@src/db';
import { User } from './users';

const getUsersCollection = async (): Promise<Collection<any>> => {
  const db = await getDB();
  return db.collection('users');
};

const findUserByEmail = async (email: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ email });
  return user;
};

const saveUser = async (user: User) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.insertOne(user);
  const savedUser = { _id: result.insertedId, ...user };
  return savedUser;
};

const findUserByProviderId = async (providerId: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ providerId: providerId });
  return user;
};

const upsertUserByProviderId = async (providerId: string, userUpdate: User) => {
  const usersCollection = await getUsersCollection();

  const result = await usersCollection.findOneAndUpdate(
    { providerId },
    { $set: userUpdate },
    { upsert: true, returnDocument: 'after' }
  );
  const user = result.value;

  return user;
};

const findUserById = async (id: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  return user;
};

export { findUserByEmail, saveUser, findUserByProviderId, upsertUserByProviderId, findUserById };
