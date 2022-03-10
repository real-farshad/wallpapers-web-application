async function getUserSavesCount(userId, db) {
    const [err, userSavesCount] = await db.getUserSavesCount(userId);
    if (err) return [err, null];

    return [null, userSavesCount];
}

module.exports = getUserSavesCount;
