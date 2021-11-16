const express = require("express");
const postsRoutes = require("./postsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const postsLikesRouters = require("./postsLikesRoutes");

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/posts-likes", postsLikesRouters);

module.exports = router;
