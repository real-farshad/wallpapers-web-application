import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || 'your_default_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 * 30, // Approximately 1 month
  },
});

export default sessionConfig;
