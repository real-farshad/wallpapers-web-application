const express = require("express");
const categoriesRoutes = require("./categoriesRoutes");

const router = express.Router();

router.use("/categories", categoriesRoutes);

module.exports = router;
