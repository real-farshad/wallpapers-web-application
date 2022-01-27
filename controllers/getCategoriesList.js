// GET /
async function getCategoriesList(req, res, next, database) {
    try {
        const categories = await database.getCategoriesList();
        return res.json(categories);
    } catch (err) {
        return next(err);
    }
}

module.exports = getCategoriesList;
