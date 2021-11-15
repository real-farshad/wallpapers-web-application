const { ObjectId } = require("mongodb");
const { categorySchema } = require("../schemas/categoriesSchemas");

// GET /
async function getCategoriesList(req, res, next, database) {
    try {
        // return all categories
        const categories = await database.getCategoriesList();
        return res.json(categories);
    } catch (err) {
        next(err);
    }
}

// POST /
// req.body => title
async function createNewCategory(req, res, next, database) {
    // validate request's body
    try {
        await categorySchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // insert new category in to the database
        const newCategoryId = await database.addNewCategory(req.body);

        // return number of inserted categories
        return res.json({ newCategoryId });
    } catch (err) {
        next(err);
    }
}

// PUT /:id
// req.body => title
async function updateCategory(req, res, next, database) {
    // validate request's body
    try {
        await categorySchema.validateAsync(req.body);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate category id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({ error: "invalid category id!" });
    }

    try {
        // update category with this id in database
        const [matchedCount, modifiedCount] = await database.updateCategoryById(
            req.params.id,
            req.body
        );

        if (matchedCount !== 1) {
            return res.status(404).json({ error: "no post with this id was found!" });
        }

        // return number of updated categories
        return res.json({ modifiedCategoriesCount: modifiedCount });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteCategory(req, res, next, database) {
    // validate category id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({ error: "invalid category id!" });
    }

    try {
        // delete category with this id in database
        const deletedCount = await database.deleteCategoryById(req.params.id);

        if (deletedCount !== 1) {
            return res.status(404).json({ error: "no category with this id was found!" });
        }

        // return deleted categories count
        return res.json({ deletedCount });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCategoriesList,
    createNewCategory,
    updateCategory,
    deleteCategory,
};
