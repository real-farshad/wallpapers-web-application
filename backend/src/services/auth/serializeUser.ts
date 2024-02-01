const serializeUser = (user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
};

export default serializeUser;
