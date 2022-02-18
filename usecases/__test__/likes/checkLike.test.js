const { ObjectId } = require("mongodb");
const checkLike = require("../../likes/checkLike");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findUserLike: jest.fn(() => {
        const err = null;
        const like = { postId: new ObjectId() };
        return [err, like];
    }),
};

describe("check like", () => {
    it("should return error with status 400 if wallpaperId is not a valid id", async () => {
        const wallpaperId = "1";
        const [err, liked] = await checkLike(wallpaperId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid wallpaperId!",
        });
    });

    it("should return false as like if there is a NOT like with related id in database", async () => {
        const db = {
            findUserLike: jest.fn(() => {
                const err = null;
                const like = null;
                return [err, like];
            }),
        };
        const [err, liked] = await checkLike(mockWallpaperId, mockUserId, db);
        expect(liked).toBe(false);
    });

    it("should return true as like if there is a like with related id in database", async () => {
        const [err, liked] = await checkLike(
            mockWallpaperId,
            mockUserId,
            mockDB
        );
        expect(liked).toBe(true);
    });
});
