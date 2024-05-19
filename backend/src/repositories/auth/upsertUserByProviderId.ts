import { User } from '@models/userModel';
import getUsersCollection from './getUsersCollection';

const upsertUserByProviderId = async (
  providerId: string,
  userUpdate: User
): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();

  const result = await usersCollection.findOneAndUpdate(
    { providerId },
    { $set: userUpdate },
    { upsert: true, returnDocument: 'after' }
  );

  const user = result.value;
  return user;
};

export default upsertUserByProviderId;
