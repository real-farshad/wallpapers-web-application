const express = require("express");
const database = require("../services");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getUserInfo,
    updateUser,
    deleteUser,
} = require("../controllers/usersControllers");

const router = express.Router();

router.get("/", validateAuthorization, (req, res, next) =>
    getUserInfo(req, res, next, database)
);

router.put("/", validateAuthorization, (req, res, next) =>
    updateUser(req, res, next, database)
);

router.delete("/", validateAuthorization, (req, res, next) =>
    deleteUser(req, res, next, database)
);

module.exports = router;
