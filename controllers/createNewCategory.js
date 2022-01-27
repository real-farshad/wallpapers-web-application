const validateCategory = require("./utils/validateCategory");
const handleError = require("./utils/handleError");

// POST /
// req.body => title
async function createNewCategory(req, res, next, database) {
    let [err, category] = await validateCategory(req.body);
    if (err) return handleError(err, res, next);

    try {
        await database.addNewCategory(category);

        return res.json({ newCategoryCreated: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = createNewCategory;
