const { ObjectId } = require("mongodb");
const deleteLike = require("../../likes/deleteLike");

const mockLikeId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findAndDeleteUserLike: jest.fn(() => {
        const err = null;
        const like = { wallpaperId: String(new ObjectId()) };
        return [err, like];
    }),
    decrementWallpaperLikeCount: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("delete like", () => {
    it("should return error with status 400 if likeId is not a valid id", async () => {
        const likeId = "1";
        const err = await deleteLike(likeId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid likeId!",
        });
    });

    it("should return error with status 404 if user like doesn't exist", async () => {
        const db = {
            findAndDeleteUserLike: jest.fn(() => {
                const err = null;
                const like = null;
                return [err, like];
            }),
        };
        const err = await deleteLike(mockLikeId, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(/.*(like).*(doesn't exist).*/gi),
        });
    });

    it("should decrement wallpapers like", async () => {
        await deleteLike(mockLikeId, mockUserId, mockDB);
        expect(mockDB.decrementWallpaperLikeCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteLike(mockLikeId, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
