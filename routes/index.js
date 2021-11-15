const express = require("express");
const postsRoutes = require("./postsRoutes");
const categoriesRoutes = require("./categoriesRoutes");

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;
