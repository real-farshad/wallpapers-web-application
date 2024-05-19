import { ObjectId } from 'mongodb';
import { SavePayload } from '.';

const refineSaveData = (save: SavePayload, userId: ObjectId) => {
  const finalizedSave = {
    ...save,
    wallpaperId: new ObjectId(save.wallpaperId),
    userId,
    createdAt: Date.now(),
  };

  return finalizedSave;
};

export default refineSaveData;
