const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function updateCategory(id, categoryUpdate) {
  let error;

  try {
    await getCategoriesCollection().updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: categoryUpdate }
    );

    error = null;
  } catch (err) {
    error = err;
  }

  return error;
}

module.exports = updateCategory;
