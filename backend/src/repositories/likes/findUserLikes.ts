import { Like } from '@src/models/likeModel';
import getLikesCollection from './getLikesCollection';
import { Document, ObjectId } from 'mongodb';

const findUserLikes = async (userId: ObjectId, query: any): Promise<Like[]> => {
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
        from: 'saves',
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
        as: 'save',
      },
    },
    {
      $addFields: {
        liked: true,
        saved: {
          $cond: {
            if: { $eq: ['$save', []] },
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

  const likesCollection = await getLikesCollection();
  const cursor = await likesCollection.aggregate(pipeline);
  const likes = await cursor.toArray();

  return likes as Like[];
};

export default findUserLikes;
