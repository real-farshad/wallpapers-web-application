const { ObjectId } = require("mongodb");
const findCollectionInfo = require("../../collections/findCollectionInfo");

const mockId = String(new ObjectId());
const mockDB = {
    findCollectionById: jest.fn(() => {
        const err = null;
        const collection = { title: "my collection" };
        return [err, collection];
    }),
};

describe("find collection info", () => {
    it("should return error with status 400 if collectionId is not a valid id", async () => {
        const invalidId = "123456789";
        const [err, collection] = await findCollectionInfo(invalidId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid collectionId!",
        });
    });

    it("should return error with status 404 if there is no collection with related id in the database", async () => {
        const db = {
            findCollectionById: jest.fn(() => {
                const err = null;
                const collection = null;
                return [err, collection];
            }),
        };
        const [err, collection] = await findCollectionInfo(mockId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(collection).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, collection] = await findCollectionInfo(mockId, mockDB);
        expect(err).toBeNull();
    });
});
