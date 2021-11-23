const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getUserComments,
    getPostComments,
    createNewComment,
    deleteComment,
} = require("../controllers/commentsControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserComments(req, res, next, database)
);

router.get("/:id", (req, res, next) => getPostComments(req, res, next, database));

router.post("/", validateAuthorization, (req, res, next) =>
    createNewComment(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteComment(req, res, next, database)
);

module.exports = router;
