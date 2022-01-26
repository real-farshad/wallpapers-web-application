const validateId = require("../utils/validateId");

// DELETE /:id
async function deleteCategory(req, res, next, database) {
    const isValidId = validateId(req.params.id);
    if (!isValidId) {
        return res.status(403).json({ error: "invalid category id!" });
    }

    try {
        const result = await database.findAndDeleteCategoryById(req.params.id);
        if (!result) {
            return res.status(404).json({
                error: "no category with this id was found!",
            });
        }

        return res.json({ categoryDeleted: true });
    } catch (err) {
        return next(err);
    }
}

module.exports = deleteCategory;
