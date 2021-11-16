const express = require("express");
const database = require("../services/index");

const {
    createNewPostLike,
    deletePostLike,
} = require("../controllers/postsLikesControllers");

const router = express.Router();

router.post("/", (req, res, next) => createNewPostLike(req, res, next, database));
router.delete("/:id", (req, res, next) => deletePostLike(req, res, next, database));

module.exports = router;
