const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const getPostsList = require("../controllers/getPostsList");
const getSinglePost = require("../controllers/getSinglePost");
const createNewPost = require("../controllers/createNewPost");
const updatePost = require("../controllers/updatePost");
const deletePost = require("../controllers/deletePost");

const router = express.Router();

router.get("/", (req, res, next) => getPostsList(req, res, next, database));

router.get("/:id", (req, res, next) => getSinglePost(req, res, next, database));

router.post("/", validateAuthorization, (req, res, next) =>
    createNewPost(req, res, next, database)
);

router.put("/:id", validateAuthorization, (req, res, next) =>
    updatePost(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deletePost(req, res, next, database)
);

module.exports = router;
