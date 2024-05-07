import getUsersCollection from './getUsersCollection';
import { User } from '@src/models/userModel';
import { ObjectId } from 'mongodb';

const updateUserById = async (user: User) => {
  const categoriesCollection = await getUsersCollection();
  const result = await categoriesCollection.findOneAndUpdate(
    { _id: new ObjectId(user._id) },
    { $set: user },
    { returnDocument: 'after' }
  );

  return result;
};

export default updateUserById;
