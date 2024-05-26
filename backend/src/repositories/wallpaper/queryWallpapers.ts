import { Document, ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';
import { Wallpaper } from '@src/models/wallpaperModel';

const queryWallpapers = async (
  query: any,
  userId?: ObjectId
): Promise<{ wallpapers: Wallpaper[]; totalCount: number }> => {
  let { title, category, startDate, endDate, sort, skip, limit } = query;

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

  if (category) {
    match.push(
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $match: {
          'category.title': {
            $regex: category,
            $options: 'i',
          },
        },
      }
    );
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
      $sort: sort,
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'publisherId',
        foreignField: '_id',
        as: 'publisher',
      },
    },
    {
      $addFields: {
        publisher: {
          $first: '$publisher',
        },
      },
    },
  ];

  if (userId) {
    data.push(
      ...[
        {
          $lookup: {
            from: 'likes',
            let: { wallpaperId: '$_id' },
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
          $lookup: {
            from: 'saves',
            let: { wallpaperId: '$_id' },
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
            liked: {
              $cond: {
                if: {
                  $eq: ['$like', []],
                },
                then: false,
                else: true,
              },
            },
            saved: {
              $cond: {
                if: {
                  $eq: ['$save', []],
                },
                then: false,
                else: true,
              },
            },
          },
        },
      ]
    );
  }

  data.push({
    $project: {
      image: {
        thumbnail: 1,
      },
      title: 1,
      likeCount: 1,
      createdAt: 1,
      publisher: '$publisher.username',
      liked: 1,
      saved: 1,
    },
  });

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

  const wallpapersCollection = await getWallpapersCollection();
  const cursor = await wallpapersCollection.aggregate(pipeline);
  const result = await cursor.toArray();

  const wallpapers = result[0]?.data || [];
  const totalCount = result[0]?.totalCount || 0;

  return { wallpapers, totalCount } as { wallpapers: Wallpaper[]; totalCount: number };
};

export default queryWallpapers;
