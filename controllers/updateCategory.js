const validateId = require("../utils/validateId");
const handleError = require("../utils/handleError");
const { categorySchema } = require("../schemas/categoriesSchemas");

// PUT /:id
// req.body => title
async function updateCategory(req, res, next, database) {
    let [err, newCategory] = await validateCategory(req.body);
    if (err) return handleError(err);

    err = validateCategoryId(req.params.id);
    if (err) return handleError(err);

    try {
        const category = await database.findAndUpdateCategoryById({
            categoryId: req.params.id,
            newCategory,
        });

        if (!category) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        return res.json({ categoryUpdated: true });
    } catch (err) {
        next(err);
    }
}

async function validateCategory(category) {
    try {
        const validCategory = await categorySchema.validateAsync(category);
        return [null, validCategory];
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };

        return [knownError, null];
    }
}

async function validateCategoryId(categoryId) {
    const isValidId = validateId(categoryId);
    if (!isValidId) {
        const knownError = {
            known: true,
            status: 403,
            message: "invalid post id!",
        };

        return knownError;
    } else return null;
}

module.exports = updateCategory;
