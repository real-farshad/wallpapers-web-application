import express, { Express } from 'express';
import helloRoutes from './api/routes/helloRoutes';

const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use('/api', helloRoutes);

  return app;
};

export default createApp;
