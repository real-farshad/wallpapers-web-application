const express = require("express");
const authRoutes = require("./authRoutes");
const usersRoutes = require("./usersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const postsRoutes = require("./postsRoutes");
const likesRoutes = require("./likesRoutes");
const commentsRoutes = require("./commentsRoutes");
const savesRoutes = require("./savesRoutes.js");
const collectionRoutes = require("./collectionsRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/posts", postsRoutes);
router.use("/likes", likesRoutes);
router.use("/posts-comments", commentsRoutes);
router.user("/saves", savesRoutes);
router.user("/collections", collectionRoutes);

module.exports = router;
