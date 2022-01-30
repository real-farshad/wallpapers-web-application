const validateCategoryId = require("./utils/validateCategoryId");
const handleError = require("./utils/handleError");

async function updateCategory(req, res, next, database) {
    const categoryId = req.params.id;
    let category = req.body;

    let err = validateCategoryId(categoryId);
    if (err) return handleError(err, res, next);

    let category;
    [err, category] = await validateCategoryObject(category);
    if (err) return handleError(err, res, next);

    err = await updateCategoryInDatabase(categoryId, category, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function updateCategoryInDatabase(categoryId, category, database) {
    try {
        const success = await database.findAndUpdateCategoryById({
            categoryId,
            category,
        });

        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no post with this id was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = updateCategory;
