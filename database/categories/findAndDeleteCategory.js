const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getCategoriesCollection = () => getDatabase().collection("categories");

async function findAndDeleteCategory(id) {
  let error, success;

  try {
    const result = await getCategoriesCollection().deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (result.deletedCount !== 1) success = false;
    else success = true;

    error = null;
  } catch (err) {
    error = err;
    success = false;
  }

  return [error, success];
}

module.exports = findAndDeleteCategory;
