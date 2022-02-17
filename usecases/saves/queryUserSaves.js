const validateSavesQuery = require("../../validation/savesQuery");

async function queryUserSaves(query, userId, db) {
    let [err, validQuery] = await validateSavesQuery(query);
    if (err) {
        err = {
            known: true,
            status: 400,
            message: err.message,
        };

        return [err, validQuery];
    }

    let saves;
    [err, saves] = await db.queryUserSaves(query, userId);
    if (err) return err;

    return [null, saves];
}

module.exports = queryUserSaves;
