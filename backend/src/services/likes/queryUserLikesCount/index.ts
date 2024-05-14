import findUserLikesCount from '@src/repositories/likes/findUserLikesCount';

const queryUserLikesCount = async (user: any) => {
  const userId = user._id;

  const likesCount = await findUserLikesCount(userId);
  return likesCount;
};
0;

export default queryUserLikesCount;
