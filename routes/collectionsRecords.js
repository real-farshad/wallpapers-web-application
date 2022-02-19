const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createCollectionRecord = require("../usecases/collectionsRecords/createCollectionRecord");
const deleteCollectionRecord = require("../usecases/collectionsRecords/deleteCollectionRecord");

const router = express.Router();

router.post("/", authenticateUser, async (req, res, next) => {
    const collectionRecord = req.body;
    const userId = req.user._id;
    const db = req.database;

    const err = await createCollectionRecord(collectionRecord, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
    const collectionRecordId = req.params.id;
    const userId = req.user._id;
    const db = req.database;

    const err = await deleteCollectionRecord(collectionRecordId, userId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
