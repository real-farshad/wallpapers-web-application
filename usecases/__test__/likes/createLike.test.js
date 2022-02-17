const { ObjectId } = require("mongodb");
const createLike = require("../../likes/createLike");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findWallpaperById: jest.fn(() => {
        const err = null;
        const wallpaper = { title: "related wallpaper" };
        return [err, wallpaper];
    }),
    findUserLike: jest.fn(() => {
        const err = null;
        const like = null;
        return [err, like];
    }),
    saveLike: jest.fn(() => {
        const err = null;
        return err;
    }),
    incrementWallpaperLikeCount: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create like", () => {
    it("should return error with status 400 if wallpaperId is not a valid id", async () => {
        const wallpaperId = "1";
        const err = await createLike(wallpaperId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaper id!",
        });
    });

    it("should return error with status 400 if related wallpaper doesn't exist", async () => {
        const db = {
            findWallpaperById: jest.fn(() => {
                const err = null;
                const wallpaper = null;
                return [err, wallpaper];
            }),
        };
        const err = await createLike(mockWallpaperId, mockUserId, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(wallpaper).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return error with status 400 if wallpaper has already been liked", async () => {
        const db = {
            ...mockDB,
            findUserLike: jest.fn(() => {
                const err = null;
                const like = { wallpaperId: String(new ObjectId()) };
                return [err, like];
            }),
        };
        const err = await createLike(mockWallpaperId, mockUserId, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(wallpaper).*(liked).*/gi),
        });
    });

    it("should save the like in database", async () => {
        await createLike(mockWallpaperId, mockUserId, mockDB);
        expect(mockDB.saveLike.mock.calls.length).toBe(1);
    });

    it("should increment wallpaper like count", async () => {
        const db = {
            ...mockDB,
            incrementWallpaperLikeCount: jest.fn(() => {
                const err = null;
                return err;
            }),
        };
        await createLike(mockWallpaperId, mockUserId, db);
        expect(mockDB.incrementWallpaperLikeCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createLike(mockWallpaperId, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
