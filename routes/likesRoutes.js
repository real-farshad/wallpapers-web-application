const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getUserLikes,
    checkLike,
    createNewLike,
    deleteLike,
} = require("../controllers/likesControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserLikes(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    checkLike(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewLike(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteLike(req, res, next, database)
);

module.exports = router;
