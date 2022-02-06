const express = require("express");
const createCategory = require("../usecases/createCategory");
const queryCategories = require("../usecases/queryCategories");
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

module.exports = router;
