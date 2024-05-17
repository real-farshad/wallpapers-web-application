import path from 'path';
import express, { Express } from 'express';
import sessionConfig from '@config/sessionConfig';
import passport from '@config/passportConfig';
import routes from '@routes/index';
import { errorHandler } from '@api/middleware/errorHandler';

const createApp = (): Express => {
  const app = express();

  app.use(sessionConfig);

  app.use(express.json());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/assets', express.static(path.join(__dirname, '../assets')));

  app.use('/api', routes);

  app.use(errorHandler);

  return app;
};

export default createApp;
