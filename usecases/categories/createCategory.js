const validateCategory = require("../../validation/category");

async function createCategory(category, db) {
    let [err, newCategory] = await validateCategory(category);
    if (err) return { known: true, status: 400, message: err.message };

    let sameCategory;
    [err, sameCategory] = await db.findCategoryByTitle(newCategory.title);
    if (err) return err;
    if (sameCategory)
        return {
            known: true,
            status: 400,
            message: "a category with this title already exists!",
        };

    err = await db.saveCategory(newCategory);
    if (err) return err;

    return null;
}

module.exports = createCategory;
