import { Document } from 'mongodb';
import getWallpapersCollection from './getWallpapersCollection';

const countQueryResults = async (query: any): Promise<{ count: number }> => {
  let { title, category, startDate, endDate } = query;

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

  pipeline.push({
    $count: 'totalDocuments',
  });

  const wallpapersCollection = await getWallpapersCollection();
  const cursor = await wallpapersCollection.aggregate(pipeline);
  const result = await cursor.toArray();

  const count = result.length > 0 ? result[0].totalDocuments : 0;
  return { count };
};

export default countQueryResults;
