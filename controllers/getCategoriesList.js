const handleError = require("./utils/handleError");

async function getCategoriesList(req, res, next, database) {
    const [err, categories] = await getCategoriesFromDatabase(database);
    if (err) return handleError(err, res, next);

    return res.json(categories);
}

async function getCategoriesFromDatabase(database) {
    try {
        const categories = await database.getCategoriesList();
        return [null, categories];
    } catch (err) {
        return [err, null];
    }
}

module.exports = getCategoriesList;
