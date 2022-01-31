const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const getUserLikes = require("../controllers/getUserLikes");
const checkLike = require("../controllers/checkLike");
const createNewLike = require("../controllers/createNewLike");
const deleteLike = require("../controllers/deleteLike");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserLikes(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    checkLike(req, res, next, database)
);

router.post("/:id", validateAuthorization, (req, res, next) =>
    createNewLike(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteLike(req, res, next, database)
);

module.exports = router;
