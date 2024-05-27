import { Save } from '@src/models/saveModel';
import getSavesCollection from './getSavesCollection';

const insertSave = async (Save: Save): Promise<Save> => {
  const savesCollection = await getSavesCollection();
  const result = await savesCollection.insertOne(Save);

  const savedWallpaperSave = { _id: result.insertedId, ...Save };
  return savedWallpaperSave;
};

export default insertSave;
