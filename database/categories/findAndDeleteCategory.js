const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findAndDeleteCategory(id) {
    try {
        let categoryExists;
        const result = await getCategoriesCollection().deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount !== 1) categoryExists = false;
        else categoryExists = true;

        return [null, categoryExists];
    } catch (err) {
        return [err, false];
    }
}

module.exports = findAndDeleteCategory;
