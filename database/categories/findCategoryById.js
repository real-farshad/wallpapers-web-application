const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findCategoryById(categoryId) {
    let error, category;

    try {
        const result = await getCategoriesCollection().findOne({
            _id: new ObjectId(categoryId),
        });

        if (!result) category = null;
        else category = result;

        error = null;
    } catch (err) {
        error = err;
        category = null;
    }

    return [error, category];
}

module.exports = findCategoryById;
