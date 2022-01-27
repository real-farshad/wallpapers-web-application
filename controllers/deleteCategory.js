const validateCategoryId = require("./utils/validateCategoryId");
const handleError = require("./utils/handleError");

// DELETE /:id
async function deleteCategory(req, res, next, database) {
    const err = validateCategoryId(req.params.id);
    if (err) return handleError(err, res, next);

    try {
        const success = await database.findAndDeleteCategoryById(req.params.id);
        if (!success) {
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
