const express = require("express");
const database = require("../services/index");

const {
    getPostsList,
    createNewPost,
    updatePost,
    deletePost,
} = require("../controllers/postsControllers");

const router = express.Router();

router.get("/", (req, res, next) => getPostsList(req, res, next, database));
router.post("/", (req, res, next) => createNewPost(req, res, next, database));
router.put("/:id", (req, res, next) => updatePost(req, res, next, database));
router.delete("/:id", (req, res, next) => deletePost(req, res, next, database));

module.exports = router;
