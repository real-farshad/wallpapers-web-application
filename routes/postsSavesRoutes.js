const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getSavedPostsList,
    getPostSave,
    createNewPostSave,
    deletePostSave,
} = require("../controllers/postsSavesControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getSavedPostsList(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    getPostSave(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewPostSave(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deletePostSave(req, res, next, database)
);

module.exports = router;
