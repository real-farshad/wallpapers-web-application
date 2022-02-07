const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function queryCategories(query) {
    try {
        const { page, limit } = query;
        const cursor = await getCategoriesCollection()
            .find()
            .sort({ createdAt: -1 })
            .skip(page > 0 ? (page - 1) * limit : 0)
            .limit(limit > 0 ? limit : 10);

        const categories = await cursor.toArray();
        return [null, categories];
    } catch (err) {
        return [err, null];
    }
}

module.exports = queryCategories;
