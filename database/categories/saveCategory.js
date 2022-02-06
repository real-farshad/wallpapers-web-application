const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function saveCategory(category) {
    try {
        await getCategoriesCollection().insertOne(category);
    } catch (err) {
        return err;
    }
}

module.exports = saveCategory;
