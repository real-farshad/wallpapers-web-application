const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const categoriesCollection = () => database().collection("categories");

async function getCategoriesList() {
    const cursor = await categoriesCollection().find();
    const result = await cursor.toArray();
    return result;
}

async function findCategoryByTitle(title) {
    const result = await categoriesCollection().findOne({ title });
    return result;
}

async function addNewCategory(newCategory) {
    await categoriesCollection().insertOne(newCategory);
}

async function findAndUpdateCategoryById(id, newCategory) {
    const result = await categoriesCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newCategory }
    );

    if (result.matchedCount !== 1) return null;
    return result;
}

async function findAndDeleteCategoryById(id) {
    const result = await categoriesCollection().deleteOne({
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
