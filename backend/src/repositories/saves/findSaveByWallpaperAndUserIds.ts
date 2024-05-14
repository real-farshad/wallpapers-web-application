import { ObjectId } from 'mongodb';
import getSavesCollection from './getSavesCollection';

const findSaveByWallpaperAndUserIds = async (wallpaperId: ObjectId, userId: ObjectId) => {
  const savesCollection = await getSavesCollection();
  const save = await savesCollection.findOne({ wallpaperId, userId });
  return save;
};

export default findSaveByWallpaperAndUserIds;
