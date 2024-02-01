import findUserById from '@repositories/auth/findUserById';

const deserializeUser = async (id: string, done: any) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
};

export default deserializeUser;
