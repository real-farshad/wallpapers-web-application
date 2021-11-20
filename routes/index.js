const express = require("express");
const postsRoutes = require("./postsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const postsLikesRoutes = require("./postsLikesRoutes");
const postsCommentsRoutes = require("./postsCommentsRoutes");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/posts-likes", postsLikesRoutes);
router.use("/posts-comments", postsCommentsRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
