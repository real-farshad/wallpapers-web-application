import { User } from '@src/models/userModel';
import getUsersCollection from './getUsersCollection';

const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
  return user;
};

export default findUserByEmail;
