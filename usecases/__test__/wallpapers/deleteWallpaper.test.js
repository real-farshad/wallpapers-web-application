const { ObjectId } = require("mongodb");
const deleteWallpaper = require("../../wallpapers/deleteWallpaper");

const mockId = String(new ObjectId());
const mockUserId = "123";
const mockDB = {
    findAndDeleteUserWallpaper: jest.fn(() => {
        const err = null;
        const success = true;
        return [err, success];
    }),
};

describe("delete wallpaper", () => {
    it("should return error with status 400 if wallpaper id is not a valid id", async () => {
        const invalidId = "123456789";
        const err = await deleteWallpaper(invalidId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaperId!",
        });
    });

    it("should return error with status 404 if there is no wallpaper with related id", async () => {
        const db = {
            findAndDeleteUserWallpaper: jest.fn(() => {
                const err = null;
                const success = false;
                return [err, success];
            }),
        };
        const err = await deleteWallpaper(mockId, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(wallpaper).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteWallpaper(mockId, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
