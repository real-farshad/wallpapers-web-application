import { Save } from '@src/models/saveModel';
import getSavesCollection from './getSavesCollection';
import { Document, ObjectId } from 'mongodb';

const findUserSaves = async (userId: ObjectId, query: any): Promise<Save[]> => {
  const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
  const limit = parseInt(query.limit, 10) > 0 ? parseInt(query.limit, 10) : 10;

  const skip = (page - 1) * limit;

  const pipeline: Document[] = [
    {
      $match: {
        userId,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'wallpapers',
        localField: 'wallpaperId',
        foreignField: '_id',
        as: 'wallpaper',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'wallpaper.0.publisherId',
        foreignField: '_id',
        as: 'publisher',
      },
    },
    {
      $addFields: {
        wallpaper: {
          $arrayElemAt: ['$wallpaper', 0],
        },
        publisher: {
          $arrayElemAt: ['$publisher', 0],
        },
      },
    },
    {
      $lookup: {
        from: 'likes',
        let: {
          wallpaperId: '$wallpaper._id',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$userId', userId],
                  },
                  {
                    $eq: ['$wallpaperId', '$$wallpaperId'],
                  },
                ],
              },
            },
          },
        ],
        as: 'like',
      },
    },
    {
      $addFields: {
        saved: true,
        liked: {
          $cond: {
            if: { $eq: ['$like', []] },
            then: false,
            else: true,
          },
        },
      },
    },
    {
      $project: {
        _id: '$wallpaper._id',
        title: '$wallpaper.title',
        'image.thumbnail': '$wallpaper.image.thumbnail',
        likeCount: '$wallpaper.likeCount',
        createdAt: 1,
        publisher: '$publisher.username',
        liked: 1,
        saved: 1,
      },
    },
  ];

  const savesCollection = await getSavesCollection();
  const cursor = await savesCollection.aggregate(pipeline);
  const saves = await cursor.toArray();

  return saves as Save[];
};

export default findUserSaves;
