const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function queryUserSaves(query, userId) {
  let error, saves;

  try {
    const { page, limit } = query;

    const pipeline = [
      {
        $match: {
          userId: userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: page > 0 ? (page - 1) * limit : 0,
      },
      {
        $limit: limit > 0 ? limit : 10,
      },
      {
        $lookup: {
          from: "wallpapers",
          localField: "wallpaperId",
          foreignField: "_id",
          as: "wallpaper",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "wallpaper.0.publisherId",
          foreignField: "_id",
          as: "publisher",
        },
      },
      {
        $addFields: {
          wallpaper: {
            $first: "$wallpaper",
          },
          publisher: {
            $first: "$publisher",
          },
        },
      },
      {
        $lookup: {
          from: "likes",
          let: {
            wallpaperId: "$wallpaper._id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$userId", userId],
                    },
                    {
                      $eq: ["$wallpaperId", "$$wallpaperId"],
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
        $addFields: {
          saved: true,
          liked: {
            $cond: {
              if: {
                $eq: ["$like", []],
              },
              then: false,
              else: true,
            },
          },
        },
      },
      {
        $project: {
          _id: "$wallpaper._id",
          title: "$wallpaper.title",
          "imageUrl.thumbnail": "$wallpaper.imageUrl.thumbnail",
          likeCount: "$wallpaper.likeCount",
          createdAt: 1,
          publisher: "$publisher.username",
          liked: 1,
          saved: 1,
        },
      },
    ];

    const cursor = await getSavesCollection().aggregate(pipeline);
    saves = await cursor.toArray();
    error = null;
  } catch (err) {
    error = err;
    saves = null;
  }

  return [error, saves];
}

module.exports = queryUserSaves;
