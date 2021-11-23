const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const {
    getNewCollections,
    getUserCollections,
    createNewCollection,
    deleteCollection,
} = require("../controllers/collectionsController");

const router = express.Router();

router.get("/", (req, res, next) => getNewCollections(req, res, next, database));

router.get("/user", validateAuthorization, (req, res, next) =>
    getUserCollections(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewCollection(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteCollection(req, res, next, database)
);

module.exports = router;
