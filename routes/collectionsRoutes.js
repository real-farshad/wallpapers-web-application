const express = require("express");
const database = require("../services/index");
const validateAuthorization = require("../middlewares/validateAuthorization");

const getNewCollectionsList = require("../controllers/getNewCollectionsList");
const getSingleCollection = require("../controllers/getSingleCollection");
const createNewCollection = require("../controllers/createNewCollection");
const deleteCollection = require("../controllers/deleteCollection");

const router = express.Router();

router.get("/", (req, res, next) =>
    getNewCollectionsList(req, res, next, database)
);

router.get("/:id", (req, res, next) =>
    getSingleCollection(req, res, next, database)
);

router.post("/", validateAuthorization, (req, res, next) =>
    createNewCollection(req, res, next, database)
);

router.delete("/:id", validateAuthorization, (req, res, next) =>
    deleteCollection(req, res, next, database)
);

module.exports = router;
