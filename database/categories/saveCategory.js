const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function saveCategory(category) {
  let error;

  try {
    await getCategoriesCollection().insertOne(category);
    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = saveCategory;
