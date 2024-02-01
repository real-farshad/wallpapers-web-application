import getUsersCollection from './getUsersCollection';

const findUserByProviderId = async (providerId: string) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ providerId: providerId });
  return user;
};

export default findUserByProviderId;
