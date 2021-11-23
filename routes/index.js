const express = require("express");
const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const postsRoutes = require("./postsRoutes");
const likesRoutes = require("./likesRoutes");
const commentsRoutes = require("./commentsRoutes");
const savesRoutes = require("./savesRoutes.js");
const collectionsRoutes = require("./collectionsRoutes");
const collectionsPostsRoutes = require("./collectionsPostsRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/posts", postsRoutes);
router.use("/likes", likesRoutes);
router.use("/comments", commentsRoutes);
router.use("/saves", savesRoutes);
router.use("/collections", collectionsRoutes);
router.use("/collections-posts", collectionsPostsRoutes);

module.exports = router;
