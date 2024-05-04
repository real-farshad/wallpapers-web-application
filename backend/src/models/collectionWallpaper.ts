import { ObjectId } from 'mongodb';

interface CollectionWallpaper {
  _id: ObjectId;
  createdAt: number;
  collectionId: ObjectId;
  wallpaperId: ObjectId;
}

export { CollectionWallpaper };
