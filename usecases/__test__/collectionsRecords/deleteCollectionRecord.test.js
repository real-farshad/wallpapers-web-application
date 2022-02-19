const { ObjectId } = require("mongodb");
const deleteCollectionRecord = require("../../collectionsRecords/deleteCollectionRecord");

const mockCollectionRecordId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findUserCollectionRecord: jest.fn(() => {
        const err = null;
        const collectionRecord = { collectionId: String(new ObjectId()) };
        return [err, collectionRecord];
    }),
    deleteCollectionRecord: jest.fn(() => {
        const err = null;
        return err;
    }),
    decrementCollectionWallpaperCount: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create collection record", () => {
    it("should return error with status 400 if collectionRecordId is not a valid id", async () => {
        const invalidId = "123456789";
        const err = await deleteCollectionRecord(invalidId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid collectionRecordId!",
        });
    });

    it("should return error status 404 if a collectionRecord with this id, made by this user, doesn't exist", async () => {
        const db = {
            findUserCollectionRecord: jest.fn(() => {
                const err = null;
                const collectionRecord = null;
                return [err, collectionRecord];
            }),
        };
        const err = await deleteCollectionRecord(
            mockCollectionRecordId,
            mockUserId,
            db
        );
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(collectionRecord).*(doesn't exist).*/gi
            ),
        });
    });

    it("should delete collection record from database", async () => {
        await deleteCollectionRecord(
            mockCollectionRecordId,
            mockUserId,
            mockDB
        );
        expect(mockDB.deleteCollectionRecord.mock.calls.length).toBe(1);
    });

    it("should decrement wallpaper count in collection", async () => {
        const db = {
            ...mockDB,
            decrementCollectionWallpaperCount: jest.fn(() => {
                const err = null;
                return err;
            }),
        };
        await deleteCollectionRecord(mockCollectionRecordId, mockUserId, db);
        expect(db.decrementCollectionWallpaperCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteCollectionRecord(
            mockCollectionRecordId,
            mockUserId,
            mockDB
        );
        expect(err).toBeNull();
    });
});
