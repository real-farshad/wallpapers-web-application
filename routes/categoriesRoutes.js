const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getCategoriesList,
    createNewCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoriesControllers");

const router = express.Router();

router.get("/", (req, res, next) => getCategoriesList(req, res, next, database));

router.post("/", validateAuthorization, (req, res, next) =>
    createNewCategory(req, res, next, database)
);

router.put("/:id", validateAuthorization, (req, res, next) =>
    updateCategory(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteCategory(req, res, next, database)
);

module.exports = router;
