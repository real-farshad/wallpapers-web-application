const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createCollection = require("../usecases/collections/createCollection");
const queryCollections = require("../usecases/collections/queryCollections");
const findSingleCollection = require("../usecases/collections/findSingleCollection");
const deleteCollection = require("../usecases/collections/deleteCollection");

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
    const collection = req.body;
    const userId = req.user._id;
    const db = req.database;

    const err = await createCollection(collection, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.get("/", async (req, res, next) => {
    const query = req.query;
    const db = req.database;

    const [err, collections] = await queryCollections(query, db);
    if (err) return next(err);

    return res.json(collections);
});

router.get("/:id", async (req, res, next) => {
    const collectionId = req.params.id;
    const query = req.query;
    const db = req.database;

    const [err, collection] = await findSingleCollection(
        collectionId,
        query,
        db
    );
    if (err) return next(err);

    return res.json(collection);
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
    const collectionId = req.params.id;
    const userId = req.user._id;
    const db = req.database;

    const err = await deleteCollection(collectionId, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
