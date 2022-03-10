const validateLikesQuery = require("../../validation/likesQuery");

async function queryUserLikes(query, userId, db) {
    let [err, validQuery] = await validateLikesQuery(query);
    if (err) {
        err = {
            known: true,
            status: 400,
            message: err.message,
        };

        return [err, null];
    }

    let likes;
    [err, likes] = await db.queryUserLikes(validQuery, userId);
    if (err) return [err, null];

    return [null, likes];
}

module.exports = queryUserLikes;
