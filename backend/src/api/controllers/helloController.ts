import { Request, Response } from 'express';
import MongoDB from '../../db';

export const getHelloMessage = async (req: Request, res: Response) => {
  try {
    const db = await MongoDB.getDb();
    const message = await db.collection('messages').findOne({});

    if (message) {
      res.status(200).send(message.text);
    } else {
      res.status(404).send('No message found');
    }
  } catch (error) {
    console.error('Database query failed', error);
    res.status(500).send('Error retrieving message');
  }
};
