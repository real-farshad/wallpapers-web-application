import { Document } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';
import { Collection } from '@src/models/collectionModel';

const findCollections = async (
  query: any
): Promise<{ collections: Collection[]; totalCount: number }> => {
  let { title, startDate, endDate, skip, limit } = query;

  const match: Document[] = [];

  if (title) {
    match.push({
      $match: {
        title: {
          $regex: title,
          $options: 'i',
        },
      },
    });
  }

  if (startDate) {
    match.push({
      $match: {
        createdAt: {
          $gte: startDate,
        },
      },
    });
  }

  if (endDate) {
    match.push({
      $match: {
        createdAt: {
          $lte: endDate,
        },
      },
    });
  }

  const data: Document[] = [
    ...match,
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
        from: 'collections-items',
        localField: '_id',
        foreignField: 'collectionId',
        as: 'item',
      },
    },
    {
      $lookup: {
        from: 'wallpapers',
        localField: 'item.0.wallpaperId',
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
  ];

  const pipeline: Document[] = [
    {
      $facet: {
        data,
        total: [
          ...match,
          {
            $count: 'count',
          },
        ],
      },
    },
    {
      $project: {
        data: 1,
        totalCount: { $arrayElemAt: ['$totalCount.count', 0] },
      },
    },
  ];

  const collectionsCollection = await getCollectionsCollection();
  const cursor = await collectionsCollection.aggregate(pipeline);
  const result = await cursor.toArray();

  const collections = result[0]?.data || [];
  const totalCount = result[0]?.totalCount || 0;

  return { collections, totalCount } as { collections: Collection[]; totalCount: number };
};

export default findCollections;
