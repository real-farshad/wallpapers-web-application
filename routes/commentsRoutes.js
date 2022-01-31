const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const getUserComments = require("../controllers/getUserComments");
const getPostComments = require("../controllers/getPostComments");
const createNewComment = require("../controllers/createNewComment");
const deleteComment = require("../controllers/deleteComment");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserComments(req, res, next, database)
);

router.get("/:id", (req, res, next) =>
    getPostComments(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewComment(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteComment(req, res, next, database)
);

module.exports = router;
