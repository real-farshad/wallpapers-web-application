const { categorySchema } = require("../schemas/categoriesSchemas");

// POST /
// req.body => title
async function createNewCategory(req, res, next, database) {
    let [err, category] = await validateCategory(req.body);
    if (err) return handleError(err);

    try {
        await database.addNewCategory(category);

        return res.json({ newCategoryCreated: true });
    } catch (err) {
        next(err);
    }
}

async function validateCategory(category) {
    let validCategory = { ...category };

    try {
        validCategory = await categorySchema.validateAsync(validCategory);
    } catch (err) {
        const knownError = {
            known: true,
            status: 403,
            message: err.message,
        };
        return [knownError, null];
    }

    return [null, validCategory];
}

module.exports = createNewCategory;
