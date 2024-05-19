import { User } from '@src/models/userModel';
import getUsersCollection from './getUsersCollection';

const findUserByProviderId = async (providerId: string): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ providerId: providerId });
  return user;
};

export default findUserByProviderId;
