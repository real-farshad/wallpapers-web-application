import { ObjectId } from 'mongodb';
import getUsersCollection from './getUsersCollection';

const findUserById = async (id: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  return user;
};

export default findUserById;
