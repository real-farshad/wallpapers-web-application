// import { CustomError } from "@src/utils/CustomError";
// import validateId from "@src/validations/validateId";

// const findOneWallpaper = async (wallpaperId: string, publisherId: string) => {
//   const { error, validId: validWallpaperId } = validateId(wallpaperId);
//   if (error) throw new CustomError(400, "Invalid wallpaper id!");

//   const wallpaper = await findWallpaperByIdAndPublisher(validWallpaperId, publisherId);
//   if (!wallpaper) throw new CustomError(404, "A wallpaper with this id doesn't exist!");

//   return wallpaper;
// }
// };

// // const validateId = require("../../validation/id");

// // async function findSingleWallpaper(wallpaperId, userId, db) {
// //     const isValidId = await validateId(wallpaperId);
// //     if (!isValidId) {
// //         const knownError = {
// //             known: true,
// //             status: 400,
// //             message: "invalid wallpaperId!",
// //         };

// //         return [knownError, null];
// //     }

// //     const [err, wallpaper] = await db.findWallpaperById(wallpaperId, userId);
// //     if (err) return [err, null];

// //     if (!wallpaper) {
// //         const knownError = {
// //             known: true,
// //             status: 404,
// //             message: "a wallpaper with this id doesn't exist!",
// //         };

// //         return [knownError, null];
// //     }

// //     return [null, wallpaper];
// // }

// // module.exports = findSingleWallpaper;
