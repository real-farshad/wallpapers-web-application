import getUsersCollection from './getUsersCollection';
import { User } from '@src/models/userModel';
import { UserUpdate } from '@src/services/user/updateUser';
import { ObjectId } from 'mongodb';

const updateUserById = async (id: ObjectId, user: UserUpdate): Promise<User | undefined> => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.findOneAndUpdate(
    { _id: id },
    { $set: user },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateUserById;
