const saveCategory = require("./saveCategory");
const findCategoryByTitle = require("./findCategoryByTitle");
const findCategoryById = require("./findCategoryById");
const queryCategories = require("./queryCategories");
const updateCategory = require("./updateCategory");
const findAndDeleteCategory = require("./findAndDeleteCategory");

module.exports = {
    saveCategory,
    findCategoryByTitle,
    findCategoryById,
    queryCategories,
    updateCategory,
    findAndDeleteCategory,
};
