const { ObjectId } = require("mongodb");
const queryCollectionRecords = require("../../collectionsRecords/queryCollectionRecords");

const mockCollectionId = String(new ObjectId());
const mockQuery = {};
const mockDB = {
    queryCollectionRecords: jest.fn(() => {
        const err = null;
        const collectionRecords = [];
        return [err, collectionRecords];
    }),
};

describe("find single collection", () => {
    it("should return error with status 400 if collectionId is not a valid id", async () => {
        const invalidId = "123456789";
        const [err, collectionRecords] = await queryCollectionRecords(
            invalidId
        );
        expect(err).toMatchObject({
            status: 400,
            message: "invalid collectionId!",
        });
    });

    it("should return error with status 400 if query.page exists and is not a number", async () => {
        const query = { page: { index: 1 } };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(number).*/gi),
        });
    });

    it("should return error with status 400 if query.page exists and is not a integer", async () => {
        const query = { page: 2.2 };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if query.page exists and is less than 0", async () => {
        const query = { page: -1 };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(greater than).*(0).*/gi),
        });
    });

    it("should return error with status 400 if query.limit exists and is not a number", async () => {
        const query = { limit: { count: 5 } };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(number).*/gi),
        });
    });

    it("should return error with status 400 if query.limit exists and is not a integer", async () => {
        const query = { limit: 2.2 };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if query.limit exists and is less than 0", async () => {
        const query = { limit: -1 };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(limit).*(greater than).*(0).*/gi
            ),
        });
    });

    it("should return error with status 400 if query.limit exists and is greater than 20", async () => {
        const query = { limit: 21 };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(less than).*(20).*/gi),
        });
    });

    it("should return error with status 400 if query has any extra properties", async () => {
        const query = { extraProperty: "extra property" };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            query
        );
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 404 if there is no collection with related id in the database", async () => {
        const db = {
            queryCollectionRecords: jest.fn(() => {
                const err = null;
                const collectionRecords = null;
                return [err, collectionRecords];
            }),
        };
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            mockQuery,
            db
        );
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(
                /.*(collection).*(doesn't exist).*/gi
            ),
        });
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, collectionRecords] = await queryCollectionRecords(
            mockCollectionId,
            mockQuery,
            mockDB
        );
        expect(err).toBeNull();
    });
});
