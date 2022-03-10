const { ObjectId } = require("mongodb");
const getUserLikesCount = require("../../likes/getUserLikesCount");

const mockUserId = String(new ObjectId());
const mockDB = {
    getUserLikesCount: jest.fn(() => {
        const err = null;
        const userLikesCount = 10;
        return [err, userLikesCount];
    }),
};

describe("query user likes count", () => {
    it("should query the database for user likes count", async () => {
        await getUserLikesCount(mockUserId, mockDB);
        expect(mockDB.getUserLikesCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, userLikesCount] = await getUserLikesCount(
            mockUserId,
            mockDB
        );
        expect(err).toBeNull();
    });
});
