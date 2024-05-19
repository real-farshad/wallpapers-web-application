import { Save } from '@src/models/saveModel';
import getSavesCollection from './getSavesCollection';

const saveWallpaperSave = async (Save: Save): Promise<Save> => {
  const savesCollection = await getSavesCollection();
  const result = await savesCollection.insertOne(Save);

  const saveWallpaperSave = { _id: result.insertedId, ...Save };
  return saveWallpaperSave;
};

export default saveWallpaperSave;
