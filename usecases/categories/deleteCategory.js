const validateId = require("../../utils/validateId");

async function updateCategory(categoryId, db) {
    const isValidId = validateId(categoryId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid category id!",
        };
    }

    const [err, success] = await db.findAndDeleteCategory(categoryId);
    if (err) return err;

    if (!success) {
        return {
            known: true,
            status: 404,
            message: "no category with this id was found!",
        };
    }

    return null;
}

module.exports = updateCategory;
