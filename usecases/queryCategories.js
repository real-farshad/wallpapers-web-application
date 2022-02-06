const validateCategoriesQuery = require("../validation/categoriesQuery");

async function queryCategories(query, db) {
    let [err, validQuery] = await validateCategoriesQuery(query);
    if (err) {
        const knownError = { known: true, status: 400, message: err.message };
        return [knownError, null];
    }

    let categories;
    [err, categories] = await db.queryCategories(validQuery);
    if (err) return [err, null];

    return [null, categories];
}

module.exports = queryCategories;
