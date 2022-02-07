const findCategoryByTitle = require("./findCategoryByTitle");
const saveCategory = require("./saveCategory");
const queryCategories = require("./queryCategories");
const findCategoryById = require("./findCategoryById");
const updateCategory = require("./updateCategory");
const findAndDeleteCategory = require("./findAndDeleteCategory");

module.exports = {
    findCategoryByTitle,
    saveCategory,
    queryCategories,
    findCategoryById,
    updateCategory,
    findAndDeleteCategory,
};
