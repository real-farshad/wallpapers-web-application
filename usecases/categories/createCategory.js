const validateCategory = require("../../validation/category");

async function createCategory(category, db) {
    let [err, validCategory] = await validateCategory(category);
    if (err) return { known: true, status: 400, message: err.message };

    let sameCategory;
    [err, sameCategory] = await db.findCategoryByTitle(validCategory.title);
    if (err) return err;
    if (sameCategory)
        return {
            known: true,
            status: 400,
            message: "a category with this title already exists!",
        };

    err = await db.saveCategory(validCategory);
    if (err) return err;

    return null;
}

module.exports = createCategory;
