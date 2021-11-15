const { ObjectId } = require("mongodb");
const { database } = require("../configs/mongodb");

const categoriesCollection = () => database().collection("categories");

async function getCategoriesList() {
    const cursor = await categoriesCollection().find();
    const result = await cursor.toArray();
    return result;
}

async function addNewCategory(newCategory) {
    const { insertedId } = await categoriesCollection().insertOne(newCategory);
    return insertedId;
}

async function updateCategoryById(id, newCategory) {
    const { matchedCount, modifiedCount } = await categoriesCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: newCategory }
    );

    return [matchedCount, modifiedCount];
}

async function findCategoryByTitle(title) {
    const result = await categoriesCollection.findOne({ title });
    return result;
}

async function deleteCategoryById(id) {
    const { deletedCount } = await categoriesCollection.deleteOne({
        _id: new ObjectId(id),
    });

    return deletedCount;
}

module.exports = {
    getCategoriesList,
    addNewCategory,
    updateCategoryById,
    findCategoryByTitle,
    deleteCategoryById,
};
