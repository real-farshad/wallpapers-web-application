const getCollectionsCount = require("../../collections/getCollectionsCount");

const mockQuery = {};
const mockDB = {
    getCollectionsCount: jest.fn(() => {
        const err = null;
        const collectionsCount = 1;
        return [err, collectionsCount];
    }),
};

describe("get collections count", () => {
    it("should return error with status 400 if query.title exists and is not a string", async () => {
        const query = { title: { text: "my title" } };
        const [err, collectionsCount] = await getCollectionsCount(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if query.title exists and is less than 3 characters long", async () => {
        const query = { title: "ab" };
        const [err, collectionsCount] = await getCollectionsCount(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if query.title exists and is more than 64 characters long", async () => {
        const longString = "a".repeat(65);
        const query = { title: longString };
        const [err, collectionsCount] = await getCollectionsCount(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(64 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if query has any extra properties", async () => {
        const query = { extraProperty: "extra property" };
        const [err, collectionsCount] = await getCollectionsCount(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should query the database for related collections", async () => {
        await getCollectionsCount(mockQuery, mockDB);
        expect(mockDB.getCollectionsCount.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, collectionsCount] = await getCollectionsCount(
            mockQuery,
            mockDB
        );
        expect(err).toBeNull();
    });
});
