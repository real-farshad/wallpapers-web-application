const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getWallpapersCollection = () => getDatabase().collection("wallpapers");

async function findWallpaperById(wallpaperId, userId) {
  let error, wallpaper;

  try {
    const pipeline = [
      {
        $match: {
          _id: ObjectId.createFromHexString(wallpaperId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "publisherId",
          foreignField: "_id",
          as: "publisher",
        },
      },
      {
        $lookup: {
          from: "comments",
          pipeline: [
            {
              $match: {
                wallpaperId: ObjectId.createFromHexString(wallpaperId),
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 2,
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $addFields: {
                user: {
                  $first: "$user",
                },
              },
            },
            {
              $project: {
                description: 1,
                createdAt: 1,
                user: {
                  username: "$user.username",
                  avatar: "$user.avatar",
                },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $addFields: {
          category: {
            $first: "$category",
          },
          publisher: {
            $first: "$publisher",
          },
        },
      },
    ];

    if (userId) {
      pipeline.push(
        ...[
          {
            $lookup: {
              from: "likes",
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$userId", userId],
                        },
                        {
                          $eq: [
                            "$wallpaperId",
                            ObjectId.createFromHexString(wallpaperId),
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "like",
            },
          },
          {
            $lookup: {
              from: "saves",
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$userId", userId],
                        },
                        {
                          $eq: [
                            "$wallpaperId",
                            ObjectId.createFromHexString(wallpaperId),
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "save",
            },
          },
          {
            $addFields: {
              liked: {
                $cond: {
                  if: {
                    $eq: ["$like", []],
                  },
                  then: false,
                  else: true,
                },
              },
              saved: {
                $cond: {
                  if: {
                    $eq: ["$save", []],
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
        imageUrl: {
          large: 1,
        },
        title: 1,
        likeCount: 1,
        createdAt: 1,
        category: "$category.title",
        publisher: {
          username: 1,
          avatar: 1,
        },
        comments: 1,
        liked: 1,
        saved: 1,
      },
    });

    const cursor = await getWallpapersCollection().aggregate(pipeline);
    const result = await cursor.toArray();
    wallpaper = result[0];
    error = null;
  } catch (err) {
    error = err;
    wallpaper = null;
  }

  return [error, wallpaper];
}

module.exports = findWallpaperById;
