const validateId = require("../../utils/validateId");
const validateCategory = require("../../validation/category");

async function updateCategory(categoryId, category, db) {
    const isValidId = validateId(categoryId);
    if (!isValidId) {
        return {
            known: true,
            status: 400,
            message: "invalid category id!",
        };
    }

    let [err, newCategory] = await validateCategory(category);
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

    if (previousCategory.title === newCategory.title) {
        return {
            known: true,
            status: 400,
            message: "category has not change!",
        };
    }

    let sameCategory;
    [err, sameCategory] = await db.findCategoryByTitle(newCategory.title);
    if (err) return err;

    if (sameCategory) {
        return {
            known: true,
            status: 400,
            message: "a category with this title already exists!",
        };
    }

    err = await db.updateCategory(categoryId, category);
    if (err) return err;

    return null;
}

module.exports = updateCategory;
