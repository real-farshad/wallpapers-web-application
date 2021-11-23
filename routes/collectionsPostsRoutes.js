const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getCollectionPosts,
    createNewCollectionPost,
    deleteCollectionPost,
} = require("../controllers/collectionsPostsControllers");

const router = express.Router();

router.get("/:id", (req, res, next) => getCollectionPosts(req, res, next, database));

router.post("/", validateAuthorization, (req, res, next) =>
    createNewCollectionPost(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteCollectionPost(req, res, next, database)
);

module.exports = router;
