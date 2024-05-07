import { ObjectId } from 'mongodb';
import getUsersCollection from './getUsersCollection';

const deleteUserById = async (id: ObjectId) => {
  const usersCollection = await getUsersCollection();
  const result = await usersCollection.deleteOne({ _id: id });

  const success = result.deletedCount === 1;
  if (success) return true;
  return false;
};

export default deleteUserById;
