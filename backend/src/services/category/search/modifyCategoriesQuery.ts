import { CategoriesQuery } from '.';

const modifyCategoriesQuery = (query: CategoriesQuery) => {
  const standardQuery: any = {};

  const page = query.page ? query.page : 1;
  const limit = query.limit ? query.limit : 10;

  standardQuery.skip = page > 0 ? (page - 1) * limit : 0;
  standardQuery.limit = limit > 0 ? limit : 10;

  return standardQuery;
};

export default modifyCategoriesQuery;
