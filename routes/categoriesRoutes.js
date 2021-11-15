const express = require("express");
const database = require("../services/index");

const {
    getCategoriesList,
    createNewCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoriesControllers");

const router = express.Router();

router.get("/", (req, res, next) => getCategoriesList(req, res, next, database));
router.post("/", (req, res, next) => createNewCategory(req, res, next, database));
router.put("/:id", (req, res, next) => updateCategory(req, res, next, database));
router.delete("/:id", (req, res, next) => deleteCategory(req, res, next, database));

module.exports = router;
