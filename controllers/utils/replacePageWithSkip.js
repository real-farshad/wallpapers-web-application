function replacePageWithSkip(queryObject) {
    const query = { ...queryObject };

    query.skip = (query.page - 1) * query.limit;
    delete query.page;

    return query;
}

module.exports = replacePageWithSkip;
