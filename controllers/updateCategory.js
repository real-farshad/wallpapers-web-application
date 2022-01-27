const validateCategoryId = require("./utils/validateCategoryId");
const validateCategory = require("./utils/validateCategory");
const handleError = require("./utils/handleError");

// PUT /:id
// req.body => title
async function updateCategory(req, res, next, database) {
    const categoryIdError = validateCategoryId(req.params.id);
    if (categoryIdError) return handleError(categoryIdError, res, next);

    let [categoryError, newCategory] = await validateCategory(req.body);
    if (categoryError) return handleError(categoryError, res, next);

    try {
        const category = await database.findAndUpdateCategoryById({
            categoryId: req.params.id,
            newCategory,
        });

        if (!category) {
            return res.status(404).json({
                error: "no post with this id was found!",
            });
        }

        return res.json({ categoryUpdated: true });
    } catch (err) {
        next(err);
    }
}

module.exports = updateCategory;
