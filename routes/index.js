const express = require("express");
const postsRoutes = require("./postsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const postsLikesRoutes = require("./postsLikesRoutes");
const usersRoutes = require("./usersRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/posts-likes", postsLikesRoutes);
// router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

module.exports = router;
