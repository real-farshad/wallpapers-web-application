async function getUserLikesCount(userId, db) {
    const [err, userLikesCount] = await db.getUserLikesCount(userId);
    if (err) return [err, null];

    return [null, userLikesCount];
}

module.exports = getUserLikesCount;
