const validateCategoryId = require("./utils/validateCategoryId");
const handleError = require("./utils/handleError");

async function deleteCategory(req, res, next, database) {
    const categoryId = req.params.id;

    let err = validateCategoryId(categoryId);
    if (err) return handleError(err, res, next);

    err = await deleteCategoryFromDatabase(categoryId, database);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
}

async function deleteCategoryFromDatabase(categoryId, database) {
    try {
        const success = await database.findAndDeleteCategoryById(categoryId);
        if (!success) {
            const knownError = {
                known: true,
                status: 404,
                message: "no category with this id was found!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = deleteCategory;
