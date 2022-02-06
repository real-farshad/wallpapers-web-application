const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findCategoryByTitle(title) {
    try {
        const result = await getCategoriesCollection().findOne({ title });
        return [null, result];
    } catch (err) {
        return err;
    }
}

module.exports = findCategoryByTitle;
