const express = require("express");
const createWallpaper = require("../usecases/wallpapers/createWallpaper");
const queryWallpapers = require("../usecases/wallpapers/queryWallpapers");
const findSingleWallpaper = require("../usecases/wallpapers/findSingleWallpaper");
const updateWallpaper = require("../usecases/wallpapers/updateWallpaper");
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

router.get("/:id", async (req, res, next) => {
    const wallpaperId = req.params.id;
    const db = req.database;

    const [err, wallpaper] = await findSingleWallpaper(wallpaperId, db);
    if (err) return handleError(err, res, next);

    return res.json(wallpaper);
});

router.put("/:id", async (req, res, next) => {
    const wallpaperId = req.params.id;
    const wallpaperUpdate = req.body;
    const db = req.database;

    const err = await updateWallpaper(wallpaperId, wallpaperUpdate, db);
    if (err) return handleError(err, res, next);

    return res.json({ success: true });
});

module.exports = router;
