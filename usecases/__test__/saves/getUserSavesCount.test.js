const { ObjectId } = require("mongodb");
const getUserSavesCount = require("../../saves/getUserSavesCount");

const mockUserId = String(new ObjectId());
const mockDB = {
    getUserSavesCount: jest.fn(() => {
        const err = null;
        const userSavesCount = 10;
        return [err, userSavesCount];
    }),
};

describe("get user saves count", () => {
    it("should query the database for user save count", async () => {
        await getUserSavesCount(mockUserId, mockDB);
        expect(mockDB.getUserSavesCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, userSavesCount] = await getUserSavesCount(
            mockUserId,
            mockDB
        );
        expect(err).toBeNull();
    });
});
