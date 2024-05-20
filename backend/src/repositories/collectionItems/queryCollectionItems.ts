import { Document, ObjectId } from 'mongodb';
import getCollectionItemsCollection from './getCollectionItemsCollection';
import { Wallpaper } from '@src/models/wallpaperModel';

const queryCollectionItems = async (
  collectionId: ObjectId,
  query: any,
  userId?: ObjectId
): Promise<Wallpaper[]> => {
  let { skip, limit } = query;

  const pipeline: Document[] = [
    {
      $match: {
        collectionId: collectionId,
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
          $first: '$wallpaper',
        },
        publisher: {
          $first: '$publisher',
        },
      },
    },
  ];

  if (userId) {
    pipeline.push(
      ...[
        {
          $lookup: {
            from: 'likes',
            let: { wallpaperId: '$wallpaperId' },
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
            let: { wallpaperId: '$wallpaperId' },
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
      _id: '$wallpaper._id',
      createdAt: 1,
      title: '$wallpaper.title',
      publisher: '$publisher.username',
      'image.thumbnail': '$wallpaper.image.thumbnail',
      likeCount: '$wallpaper.likeCount',
      liked: 1,
      saved: 1,
    },
  });

  const collectionItemsCollection = await getCollectionItemsCollection();
  const cursor = await collectionItemsCollection.aggregate(pipeline);
  const wallpapers = await cursor.toArray();

  return wallpapers as Wallpaper[];
};

export default queryCollectionItems;
