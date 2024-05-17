import { Document } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const queryCollections = async (query: any) => {
  let { title, startDate, endDate, skip, limit } = query;

  const pipeline: Document[] = [];

  if (title) {
    pipeline.push({
      $match: {
        title: {
          $regex: title,
          $options: 'i',
        },
      },
    });
  }

  if (startDate) {
    pipeline.push({
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    });
  }

  if (endDate) {
    pipeline.push({
      $match: {
        createdAt: {
          $lte: endDate,
        },
      },
    });
  }

  pipeline.push(
    ...[
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'collections-records',
          localField: '_id',
          foreignField: 'collectionId',
          as: 'record',
        },
      },
      {
        $lookup: {
          from: 'wallpapers',
          localField: 'record.0.wallpaperId',
          foreignField: '_id',
          as: 'wallpaper',
        },
      },
      {
        $addFields: {
          user: {
            $first: '$user',
          },
          wallpaper: {
            $first: '$wallpaper',
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          wallpaperCount: 1,
          createdAt: 1,
          'user.username': '$user.username',
          'wallpaper.image.thumbnail': '$wallpaper.image.thumbnail',
        },
      },
    ]
  );

  const collectionsCollection = await getCollectionsCollection();
  const cursor = await collectionsCollection.aggregate(pipeline);
  const collections = await cursor.toArray();

  return collections;
};

export default queryCollections;
