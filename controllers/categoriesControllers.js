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
        await database.addNewCategory(req.body);

        // return success
        return res.json({ newCategoryCreated: true });
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
        return res.status(403).json({
            error: "invalid category id!",
        });
    }

    try {
        // find and update category
        const result = await database.findAndUpdateCategoryById(req.params.id, req.body);

        if (!result) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        // return success
        return res.json({ categoryUpdated: true });
    } catch (err) {
        next(err);
    }
}

// DELETE /:id
async function deleteCategory(req, res, next, database) {
    // validate category id
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(403).json({
            error: "invalid category id!",
        });
    }

    try {
        // find and delete category
        const result = await database.findAndDeleteCategoryById(req.params.id);

        if (!result) {
            return res.status(404).json({
                error: "no category with this id was found!",
            });
        }

        // return success
        return res.json({ categoryDeleted: true });
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
