const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getUserSavedPosts,
    checkSave,
    createNewSave,
    deleteSave,
} = require("../controllers/savesControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserSavedPosts(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    checkSave(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewSave(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteSave(req, res, next, database)
);

module.exports = router;
