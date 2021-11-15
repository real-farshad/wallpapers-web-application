const { database } = require("../configs/mongodb");

const categoriesCollection = () => database().collection("categories");

async function findCategoryByTitle(title) {
    const result = await categoriesCollection.findOne({ title });
    return result;
}

module.exports = {
    findCategoryByTitle,
};
