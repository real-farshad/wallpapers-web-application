import { ObjectId } from 'mongodb';
import { saveInput } from '.';

const refineSaveData = (save: saveInput, userId: ObjectId) => {
  const finalizedSave = {
    ...save,
    wallpaperId: new ObjectId(save.wallpaperId),
    userId,
    createdAt: Date.now(),
  };

  return finalizedSave;
};

export default refineSaveData;
