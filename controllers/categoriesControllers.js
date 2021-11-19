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
    let newCategory = req.body;

    // validate request's body
    try {
        newCategory = await categorySchema.validateAsync(newCategory);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    try {
        // insert new category in to the database
        await database.addNewCategory(newCategory);

        // return success
        return res.json({ newCategoryCreated: true });
    } catch (err) {
        next(err);
    }
}

// PUT /:id
// req.body => title
async function updateCategory(req, res, next, database) {
    const categoryId = req.params.id;
    let updatedCategory = req.body;

    // validate request's body
    try {
        updatedCategory = await categorySchema.validateAsync(updatedCategory);
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }

    // validate category id
    if (!ObjectId.isValid(categoryId)) {
        return res.status(403).json({
            error: "invalid category id!",
        });
    }

    try {
        // find and update category
        const result = await database.findAndUpdateCategoryById(
            categoryId,
            updatedCategory
        );

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
    const categoryId = req.params.id;

    // validate category id
    if (!ObjectId.isValid(categoryId)) {
        return res.status(403).json({
            error: "invalid category id!",
        });
    }

    try {
        // find and delete category
        const result = await database.findAndDeleteCategoryById(categoryId);

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
