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

  return standardQuery;
};

export default refineQueryFields;
