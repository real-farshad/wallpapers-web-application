const express = require("express");
const authenticateUser = require("../middleware/authenticateUser");
const createLike = require("../usecases/likes/createLike");
const getUserLikesCount = require("../usecases/likes/getUserLikesCount");
const queryUserLikes = require("../usecases/likes/queryUserLikes");
const checkLike = require("../usecases/likes/checkLike");
const deleteLike = require("../usecases/likes/deleteLike");

const router = express.Router();

router.post("/:id", authenticateUser, async (req, res, next) => {
  const wallpaperId = req.params.id;
  const userId = req.user._id;
  const db = req.database;

  const err = await createLike(wallpaperId, userId, db);
  if (err) return next(err);

  return res.json({ success: true });
});

router.get("/count", authenticateUser, async (req, res, next) => {
  const userId = req.user._id;
  const db = req.database;

  const [err, userLikesCount] = await getUserLikesCount(userId, db);
  if (err) return next(err);

  return res.json({ count: userLikesCount });
});

router.get("/", authenticateUser, async (req, res, next) => {
  const query = req.query;
  const userId = req.user._id;
  const db = req.database;

  const [err, likes] = await queryUserLikes(query, userId, db);
  if (err) return next(err);

  return res.json(likes);
});

router.get("/check/:id", authenticateUser, async (req, res, next) => {
  const wallpaperId = req.params.id;
  const userId = req.user._id;
  const db = req.database;

  const [err, liked] = await checkLike(wallpaperId, userId, db);
  if (err) return next(err);

  return res.json({ liked });
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
  const wallpaperId = req.params.id;
  const userId = req.user._id;
  const db = req.database;

  const err = await deleteLike(wallpaperId, userId, db);
  if (err) return next(err);

  return res.json({ success: true });
});

module.exports = router;
