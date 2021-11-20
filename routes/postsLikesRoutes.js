const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getPostLike,
    createNewPostLike,
    deletePostLike,
    getLikedPostsList,
} = require("../controllers/postsLikesControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getLikedPostsList(req, res, next, database)
);

router.get("/:id", validateAuthorization, (req, res, next) =>
    getPostLike(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewPostLike(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deletePostLike(req, res, next, database)
);

module.exports = router;
