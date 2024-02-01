import getUsersCollection from './getUsersCollection';

const findUserByEmail = async (email: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ email });
  return user;
};

export default findUserByEmail;
