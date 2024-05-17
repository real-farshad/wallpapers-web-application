import { Document, ObjectId } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const queryWallpapers = async (query: any, userId?: ObjectId) => {
  let { title, category, startDate, endDate, sort, skip, limit } = query;

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

  if (category) {
    pipeline.push(
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
    ]
  );

  if (userId) {
    pipeline.push(
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

  pipeline.push({
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

  const wallpapersCollection = await getWallpapersCollection();
  const cursor = await wallpapersCollection.aggregate(pipeline);
  const wallpapers = await cursor.toArray();

  return wallpapers;
};

export default queryWallpapers;
