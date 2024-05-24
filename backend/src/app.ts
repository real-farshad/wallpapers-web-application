import path from 'path';
import express, { Express } from 'express';
import configureSession from '@src/config/session';
import passport from '@config/passport';
import routes from '@routes/index';
import { errorHandler } from '@api/middleware/errorHandler';

const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  configureSession(app);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/assets', express.static(path.join(__dirname, '../assets')));

  app.use('/api', routes);

  app.use(errorHandler);

  return app;
};

export default createApp;
