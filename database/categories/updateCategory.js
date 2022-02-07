const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function updateCategory(id, category) {
    try {
        await getCategoriesCollection().updateOne(
            { _id: new ObjectId(id) },
            { $set: category }
        );
        return null;
    } catch (err) {
        return err;
    }
}

module.exports = updateCategory;
