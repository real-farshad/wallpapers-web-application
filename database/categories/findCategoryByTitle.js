const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findCategoryByTitle(title) {
    let error, category;

    try {
        const result = await getCategoriesCollection().findOne({ title });
        if (!result) category = null;
        else category = result;

        error = null;
    } catch (err) {
        error = err;
        category = null;
    }

    return [error, category];
}

module.exports = findCategoryByTitle;
