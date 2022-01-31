const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const getUserSavedPosts = require("../controllers/getUserSavedPosts");
const checkSave = require("../controllers/checkSave");
const createNewSave = require("../controllers/createNewSave");
const deleteSave = require("../controllers/deleteSave");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserSavedPosts(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    checkSave(req, res, next, database)
);

router.post("/:id", validateAuthorization, (req, res, next) =>
    createNewSave(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteSave(req, res, next, database)
);

module.exports = router;
