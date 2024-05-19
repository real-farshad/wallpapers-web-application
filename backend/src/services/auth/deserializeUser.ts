import findUserById from '@repositories/auth/findUserById';
import { ObjectId } from 'mongodb';

const deserializeUser = async (userId: string, done: any) => {
  try {
    const userObjectId = new ObjectId(userId);
    const user = await findUserById(userObjectId);

    done(null, user);
  } catch (error) {
    done(error);
  }
};

export default deserializeUser;
