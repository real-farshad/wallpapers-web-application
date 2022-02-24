const { ObjectId } = require("mongodb");
const { getDatabase } = require("../../config/mongodb");
const getSavesCollection = () => getDatabase().collection("saves");

async function findAndDeleteUserSave(saveId, userId) {
    let error, success;

    try {
        const result = await getSavesCollection().deleteOne({
            _id: new ObjectId(saveId),
            userId: new ObjectId(userId),
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

module.exports = findAndDeleteUserSave;
