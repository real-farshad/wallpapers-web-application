import { MongoClient, Db } from 'mongodb';
import { CustomError } from '@src/utils/CustomError';

let dbInstance: any = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  try {
    const client = new MongoClient(uri || '');
    await client.connect();

    dbInstance = client.db(dbName);
    console.log('Connected to Mongodb...');
  } catch (error) {
    throw new Error('Could not connect to MongoDB');
  }
};

export const getDB = async (): Promise<Db> => {
  if (!dbInstance) {
    try {
      await connectDB();
    } catch (error) {
      throw new CustomError(500, 'Unable to initialize DB isntance.');
    }
  }

  return dbInstance;
};
