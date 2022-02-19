const { ObjectId } = require("mongodb");
const createCollection = require("../../collections/createCollection");

const mockCollection = { title: "new collection title" };
const mockUserId = String(new ObjectId());
const mockDB = {
    saveCollection: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create collection", () => {
    it("should return error with status 400 if collection.title doesn't exist", async () => {
        const collection = {};
        const err = await createCollection(collection);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(required).*/gi),
        });
    });

    it("should return error with status 400 if the collection.title is not a string", async () => {
        const collection = { title: 1 };
        const err = await createCollection(collection);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if the collection.title is less than 3 characters", async () => {
        const collection = { title: "ab" };
        const err = await createCollection(collection);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if the collection.title is more than 64 characters", async () => {
        const longString = "a".repeat(65);
        const collection = { title: longString };
        const err = await createCollection(collection);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(64 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if collection has any extra properties", async () => {
        const collection = {
            ...mockCollection,
            extraProperty: "extra property",
        };
        const err = await createCollection(collection);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should save collection in database", async () => {
        await createCollection(mockCollection, mockUserId, mockDB);
        expect(mockDB.saveCollection.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createCollection(mockCollection, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
