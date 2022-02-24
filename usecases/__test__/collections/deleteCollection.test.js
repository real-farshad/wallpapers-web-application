const { ObjectId } = require("mongodb");
const deleteCollection = require("../../collections/deleteCollection");

const mockCollectionId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
    findUserCollection: jest.fn(() => {
        const err = null;
        const collection = [];
        return [err, collection];
    }),
    deleteManyCollectionRecords: jest.fn(() => {
        const err = null;
        return err;
    }),
    deleteCollection: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("find single collection", () => {
    it("should return error with status 400 if collectionId is not a valid id", async () => {
        const invalidId = "123456789";
        const err = await deleteCollection(invalidId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid collectionId!",
        });
    });

    it("should return error with status 404 if a collection with this id, by this user, doesn't exist", async () => {
        const db = {
            findUserCollection: jest.fn(() => {
                const err = null;
                const collection = null;
                return [err, collection];
            }),
        };
        const err = await deleteCollection(mockCollectionId, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(collection).*(doesn't exist).*/gi
            ),
        });
    });

    it("should delete related collection records from database", async () => {
        await deleteCollection(mockCollectionId, mockUserId, mockDB);
        expect(mockDB.deleteManyCollectionRecords.mock.calls.length).toBe(1);
    });

    it("should delete the collection from database", async () => {
        const db = {
            ...mockDB,
            deleteCollection: jest.fn(() => {
                const err = null;
                return err;
            }),
        };
        await deleteCollection(mockCollectionId, mockUserId, db);
        expect(mockDB.deleteCollection.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteCollection(
            mockCollectionId,
            mockUserId,
            mockDB
        );
        expect(err).toBeNull();
    });
});
