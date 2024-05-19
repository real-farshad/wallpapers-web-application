import { User } from '@src/models/userModel';
import getUsersCollection from './getUsersCollection';

const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ email });
  return user;
};

export default findUserByEmail;
