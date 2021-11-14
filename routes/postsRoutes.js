const express = require("express");
const postsDatabase = require("../services/postsServices");
const categoriesDatabase = require("../services/categoriesServices");

const {
    getPostsList,
    createNewPost,
    updatePost,
    deletePost,
} = require("../controllers/postsControllers");

const router = express.Router();

router.get("/", (req, res, next) => {
    const database = {
        findCategoryById: categoriesDatabase.findCategoryById,
        getPostsList: postsDatabase.getPostsList,
    };

    getPostsList(req, res, next, database);
});

router.post("/", (req, res, next) => {
    const database = {
        findCategoryById: categoriesDatabase.findCategoryById,
        addNewPost: postsDatabase.addNewPost,
    };

    createNewPost(req, res, next, database);
});

router.put("/:id", (req, res, next) => {
    const database = {
        findCategoryById: categoriesDatabase.findCategoryById,
        updatePostById: postsDatabase.updatePostById,
    };

    updatePost(req, res, next, database);
});

router.delete("/:id", (req, res, next) => {
    const database = {
        deletePostById: postsDatabase.deletePostById,
    };

    deletePost(req, res, next, database);
});

module.exports = router;
