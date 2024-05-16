import { Document } from 'mongodb';
import getCollectionsCollection from './getCollectionsCollection';

const countQueryResults = async (query: any) => {
  let { title, startDate, endDate } = query;

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

  pipeline.push({
    $count: 'totalDocuments',
  });

  const collectionsCount = await getCollectionsCollection();
  const cursor = await collectionsCount.aggregate(pipeline);
  const result = await cursor.toArray();

  const count = result.length > 0 ? result[0].totalDocuments : 0;
  return { count };
};

export default countQueryResults;
