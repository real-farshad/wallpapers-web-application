const validateId = require("../../validation/id");

async function updateCategory(categoryId, db) {
    const isValidId = await validateId(categoryId);
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
            message: "a category with this id doesn't exist!",
        };
    }

    return null;
}

module.exports = updateCategory;
