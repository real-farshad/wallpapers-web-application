const { ObjectId } = require("mongodb");
const checkSave = require("../../saves/checkSave");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findUserSave: jest.fn(() => {
        const err = null;
        const save = { postId: new ObjectId() };
        return [err, save];
    }),
};

describe("check save", () => {
    it("should return error with status 400 if wallpaperId is not a valid id", async () => {
        const wallpaperId = "1";
        const [err, saved] = await checkSave(wallpaperId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaper id!",
        });
    });

    it("should return false as save if there is NOT a save with related id in database", async () => {
        const db = {
            findUserSave: jest.fn(() => {
                const err = null;
                const save = null;
                return [err, save];
            }),
        };
        const [err, saved] = await checkSave(mockWallpaperId, mockUserId, db);
        expect(saved).toBe(false);
    });

    it("should return true as save if there is a save with related id in database", async () => {
        const [err, saved] = await checkSave(
            mockWallpaperId,
            mockUserId,
            mockDB
        );
        expect(saved).toBe(true);
    });
});
