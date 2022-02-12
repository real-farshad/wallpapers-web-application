const validateId = require("../../utils/validateId");
const validateCategory = require("../../validation/category");

async function updateCategory(categoryId, categoryUpdate, db) {
    const isValidId = validateId(categoryId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid category id!",
        };
    }

    let [err, update] = await validateCategory(categoryUpdate);
    if (err) return { known: true, status: 400, message: err.message };

    let previousCategory;
    [err, previousCategory] = await db.findCategoryById(categoryId);
    if (err) return err;

    if (!previousCategory) {
        return {
            known: true,
            status: 404,
            message: "a category with this id doesn't exist!",
        };
    }

    if (previousCategory.title === update.title) {
        return {
            known: true,
            status: 400,
            message: "category has not change!",
        };
    }

    let sameCategory;
    [err, sameCategory] = await db.findCategoryByTitle(update.title);
    if (err) return err;

    if (sameCategory) {
        return {
            known: true,
            status: 400,
            message: "a category with this title already exists!",
        };
    }

    err = await db.updateCategory(categoryId, update);
    if (err) return err;

    return null;
}

module.exports = updateCategory;
