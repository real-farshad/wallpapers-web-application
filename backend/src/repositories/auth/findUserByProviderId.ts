import { User } from '@src/models/userModel';
import getUsersCollection from './getUsersCollection';

const findUserByProviderId = async (id: string): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ providerId: id });
  return user;
};

export default findUserByProviderId;
