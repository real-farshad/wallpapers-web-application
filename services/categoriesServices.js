const { database } = require("../configs/mongodb");

const categoriesCollection = () => database().collection("categories");

async function findCategoryById(id) {
    const result = await categoriesCollection.findOne({ _id: id });
    return result;
}

module.exports = {
    findCategoryById,
};
