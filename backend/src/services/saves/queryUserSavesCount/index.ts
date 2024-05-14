import findUserSavesCount from '@src/repositories/saves/findUserSavesCount';

const queryUserSavesCount = async (user: any) => {
  const userId = user._id;

  const savesCount = await findUserSavesCount(userId);
  return savesCount;
};

export default queryUserSavesCount;
