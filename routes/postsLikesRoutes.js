const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    createNewPostLike,
    deletePostLike,
} = require("../controllers/postsLikesControllers");

const router = express.Router();

router.post("/", validateAuthorization, (req, res, next) =>
    createNewPostLike(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deletePostLike(req, res, next, database)
);

module.exports = router;
