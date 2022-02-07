const express = require("express");
const createCategory = require("../usecases/categories/createCategory");
const queryCategories = require("../usecases/categories/queryCategories");
const updateCategory = require("../usecases/categories/updateCategory");
const deleteCategory = require("../usecases/categories/deleteCategory");
const handleError = require("../utils/handleError");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const db = req.database;
    const category = req.body;

    const err = await createCategory(category, db);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
});

router.get("/", async (req, res, next) => {
    const db = req.database;
    const query = req.query;

    const [err, categories] = await queryCategories(query, db);
    if (err) return handleError(err, res, next);

    return res.json(categories);
});

router.put("/:id", async (req, res, next) => {
    const db = req.database;
    const categoryId = req.params.id;
    const category = req.body;

    const err = await updateCategory(categoryId, category, db);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
});

router.delete("/:id", async (req, res, next) => {
    const db = req.database;
    const categoryId = req.params.id;

    const err = await deleteCategory(categoryId, db);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
});

module.exports = router;
