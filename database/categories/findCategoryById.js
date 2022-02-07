const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findCategoryByTitle(id) {
    try {
        const category = await getCategoriesCollection().findOne({
            _id: new ObjectId(id),
        });
        return [null, category];
    } catch (err) {
        return [err, null];
    }
}

module.exports = findCategoryByTitle;
