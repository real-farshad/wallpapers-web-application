async function findCategoryByTitleInDatabase(categoryTitle, database) {
    try {
        const category = await database.findCategoryByTitle(categoryTitle);

        if (!category) {
            const knownError = {
                knwon: true,
                status: 404,
                message: "this category does not exist!",
            };

            return [knownError, null];
        }

        return [null, category];
    } catch (err) {
        return [err, null];
    }
}

module.exports = findCategoryByTitleInDatabase;
