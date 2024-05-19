import { ObjectId } from 'mongodb';
import getUsersCollection from './getUsersCollection';
import { User } from '@src/models/userModel';

const findUserById = async (id: string): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  return user;
};

export default findUserById;
