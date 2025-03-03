const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createSave = require("../usecases/saves/createSave");
const getUserSavesCount = require("../usecases/saves/getUserSavesCount");
const queryUserSaves = require("../usecases/saves/queryUserSaves");
const deleteSave = require("../usecases/saves/deleteSave");

const router = express.Router();

router.post("/:id", authenticateUser, async (req, res, next) => {
  const wallpaperId = req.params.id;
  const userId = req.user._id;
  const db = req.database;

  const err = await createSave(wallpaperId, userId, db);
  if (err) return next(err);

  return res.json({ success: true });
});

router.get("/count", authenticateUser, async (req, res, next) => {
  const userId = req.user._id;
  const db = req.database;

  const [err, userSavesCount] = await getUserSavesCount(userId, db);
  if (err) return next(err);

  return res.json({ count: userSavesCount });
});

router.get("/", authenticateUser, async (req, res, next) => {
  const query = req.query;
  const userId = req.user._id;
  const db = req.database;

  const [err, saves] = await queryUserSaves(query, userId, db);
  if (err) return next(err);

  return res.json(saves);
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
  const wallpaperId = req.params.id;
  const userId = req.user._id;
  const db = req.database;

  const err = await deleteSave(wallpaperId, userId, db);
  if (err) return next(err);

  return res.json({ success: true });
});

module.exports = router;
