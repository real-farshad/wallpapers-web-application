import { User } from '@models/userModel';
import getUsersCollection from './getUsersCollection';

const saveUser = async (user: User) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.insertOne(user);
  const savedUser = { _id: result.insertedId, ...user };
  return savedUser;
};

export default saveUser;
