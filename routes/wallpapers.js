const express = require("express");
const createWallpaper = require("../usecases/wallpapers/createWallpaper");
const queryWallpapers = require("../usecases/wallpapers/queryWallpapers");
const handleError = require("../utils/handleError");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const wallpaper = req.body;
    const db = req.database;

    const err = await createWallpaper(wallpaper, db);
    if (err) return handleError(err, res, next);

    return res.send("");
});

router.get("/", async (req, res, next) => {
    const query = req.query;
    const db = req.database;

    const [err, wallpapers] = await queryWallpapers(query, db);
    if (err) return handleError(err, res, next);

    return res.json(wallpapers);
});

module.exports = router;
