const replaceLocalFields = (user: any, update: any) => {
  const updatedUser = { ...user };

  if (update.username) updatedUser.username = update.username;
  if (update.email) updatedUser.email = update.email;
  if (update.password) updatedUser.password = update.password;

  return updatedUser;
};

export default replaceLocalFields;
