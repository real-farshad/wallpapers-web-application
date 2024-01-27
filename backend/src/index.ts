import 'dotenv/config';
import createApp from '@src/app';
import { connectDB } from '@src/db';

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const app = createApp();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
