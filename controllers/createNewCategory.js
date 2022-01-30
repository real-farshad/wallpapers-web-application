const validateCategoryObject = require("./utils/validateCategoryObject");
const handleError = require("./utils/handleError");

async function createNewCategory(req, res, next, database) {
    let category = req.body;

    let err;
    [err, category] = await validateCategoryObject(category);
    if (err) return handleError(err, res, next);

    err = await addNewCategoryToDatabase(category, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function addNewCategoryToDatabase(category, database) {
    try {
        await database.addNewCategory(category);
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = createNewCategory;
