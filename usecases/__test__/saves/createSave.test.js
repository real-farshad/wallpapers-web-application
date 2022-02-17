const { ObjectId } = require("mongodb");
const createSave = require("../../saves/createSave");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findWallpaperById: jest.fn(() => {
        const err = null;
        const wallpaper = { title: "related wallpaper" };
        return [err, wallpaper];
    }),
    findUserSave: jest.fn(() => {
        const err = null;
        const save = null;
        return [err, save];
    }),
    saveWallpaperSave: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create save", () => {
    it("should return error with status 400 if wallpaperId is not a valid id", async () => {
        const wallpaperId = "1";
        const err = await createSave(wallpaperId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaper id!",
        });
    });

    it("should return error with status 404 if related wallpaper doesn't exist", async () => {
        const db = {
            findWallpaperById: jest.fn(() => {
                const err = null;
                const wallpaper = null;
                return [err, wallpaper];
            }),
        };
        const err = await createSave(mockWallpaperId, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(wallpaper).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return error with status 400 if wallpaper has already been saved", async () => {
        const db = {
            ...mockDB,
            findUserSave: jest.fn(() => {
                const err = null;
                const save = { wallpaperId: String(new ObjectId()) };
                return [err, save];
            }),
        };
        const err = await createSave(mockWallpaperId, mockUserId, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(wallpaper).*(saved).*/gi),
        });
    });

    it("should save the wallpaper save in database", async () => {
        await createSave(mockWallpaperId, mockUserId, mockDB);
        expect(mockDB.saveWallpaperSave.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createSave(mockWallpaperId, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
