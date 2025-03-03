const express = require("express");
// const authenticateUser = require("../middleware/authenticateUser");
// const createCollectionRecord = require("../usecases/collectionsRecords/createCollectionRecord");
const queryCollectionWallpapers = require("../usecases/collectionsRecords/queryCollectionWallpapers");
// const deleteCollectionRecord = require("../usecases/collectionsRecords/deleteCollectionRecord");

const router = express.Router();

// router.post("/", authenticateUser, async (req, res, next) => {
//     const collectionRecord = req.body;
//     const userId = req.user._id;
//     const db = req.database;

//     const err = await createCollectionRecord(collectionRecord, userId, db);
//     if (err) return next(err);

//     return res.json({ success: true });
// });

router.get("/:id", async (req, res, next) => {
  const collectionId = req.params.id;
  const userId = req.user ? req.user._id : null;
  const query = req.query;
  const db = req.database;

  const [err, collectionWallpapers] = await queryCollectionWallpapers(
    collectionId,
    userId,
    query,
    db
  );
  if (err) return next(err);

  return res.json(collectionWallpapers);
});

// router.delete("/:id", authenticateUser, async (req, res, next) => {
//     const collectionRecordId = req.params.id;
//     const userId = req.user._id;
//     const db = req.database;

//     const err = await deleteCollectionRecord(collectionRecordId, userId, db);
//     if (err) return next(err);

//     return res.json({ success: true });
// });

module.exports = router;
