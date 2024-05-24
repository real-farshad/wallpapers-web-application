import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Express } from 'express';

const configureSession = (app: Express) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
      }),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 * 30, // Approximately 1 month
      },
    })
  );
};

export default configureSession;
