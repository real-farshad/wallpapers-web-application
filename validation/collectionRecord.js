const validateId = require("./id");

async function validateCollectionRecord(collectionRecord) {
    const isValidCollectionId = await validateId(collectionRecord.collectionId);
    if (!isValidCollectionId) {
        const error = { message: "invalid collectionId!" };
        return [error, null];
    }

    const isValidWallpaperId = await validateId(collectionRecord.wallpaperId);
    if (!isValidWallpaperId) {
        const error = { message: "invalid wallpaperId!" };
        return [error, null];
    }

    return [null, collectionRecord];
}

module.exports = validateCollectionRecord;
