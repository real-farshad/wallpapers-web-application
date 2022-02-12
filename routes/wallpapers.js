const express = require("express");
const createWallpaper = require("../usecases/wallpapers/createWallpaper");
const queryWallpapers = require("../usecases/wallpapers/queryWallpapers");
const findSingleWallpaper = require("../usecases/wallpapers/findSingleWallpaper");
const updateWallpaper = require("../usecases/wallpapers/updateWallpaper");
const deleteWallpaper = require("../usecases/wallpapers/deleteWallpaper");

const router = express.Router();

router.post("/", async (req, res, next) => {
    const wallpaper = req.body;
    const db = req.database;

    const err = await createWallpaper(wallpaper, db);
    if (err) return next(err);

    return res.send("");
});

router.get("/", async (req, res, next) => {
    const query = req.query;
    const db = req.database;

    const [err, wallpapers] = await queryWallpapers(query, db);
    if (err) return next(err);

    return res.json(wallpapers);
});

router.get("/:id", async (req, res, next) => {
    const wallpaperId = req.params.id;
    const db = req.database;

    const [err, wallpaper] = await findSingleWallpaper(wallpaperId, db);
    if (err) return next(err);

    return res.json(wallpaper);
});

router.put("/:id", async (req, res, next) => {
    const wallpaperId = req.params.id;
    const wallpaperUpdate = req.body;
    const db = req.database;

    const err = await updateWallpaper(wallpaperId, wallpaperUpdate, db);
    if (err) return next(err);

    return res.json({ success: true });
});

router.delete("/:id", async (req, res, next) => {
    const wallpaperId = req.params.id;
    const db = req.database;

    const err = await deleteWallpaper(wallpaperId, db);
    if (err) return next(err);

    return res.json({ success: true });
});

module.exports = router;
