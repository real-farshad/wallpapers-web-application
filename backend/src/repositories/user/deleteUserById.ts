import { ObjectId } from 'mongodb';
import getUsersCollection from './getUsersCollection';

const deleteUserById = async (id: ObjectId) => {
  const usersCollection = await getUsersCollection();
  return await usersCollection.deleteOne({ _id: id });
};

export default deleteUserById;
