const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/mongodb");

const getCategoriesCollection = () => getDatabase().collection("categories");

async function getCategoriesList() {
    const cursor = await getCategoriesCollection().find();
    const result = await cursor.toArray();
    return result;
}

async function findCategoryByTitle(title) {
    const result = await getCategoriesCollection().findOne({ title });
    return result;
}

async function addNewCategory(newCategory) {
    await getCategoriesCollection().insertOne(newCategory);
}

async function findAndUpdateCategoryById(id, newCategory) {
    const result = await getCategoriesCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newCategory }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeleteCategoryById(id) {
    const result = await getCategoriesCollection().deleteOne({
        _id: new ObjectId(id),
    });

    if (result.deletedCount !== 1) return null;
    return result;
}

module.exports = {
    getCategoriesList,
    findCategoryByTitle,
    addNewCategory,
    findAndUpdateCategoryById,
    findAndDeleteCategoryById,
};
