import { queryInput } from '.';

const refineQueryFields = (query: queryInput) => {
  const { title, startDate, endDate } = query;

  const standardQuery: any = {};

  if (title) {
    standardQuery.title = title;
  }

  if (startDate) {
    standardQuery.startDate = new Date(startDate).getTime();
  }

  if (endDate) {
    standardQuery.endDate = new Date(endDate).getTime();
  }

  const page = query.page ? query.page : 1;
  const limit = query.limit ? query.limit : 10;

  standardQuery.skip = page > 0 ? (page - 1) * limit : 0;
  standardQuery.limit = limit > 0 ? limit : 10;

  return standardQuery;
};

export default refineQueryFields;
