const queryCategories = require("../../categories/queryCategories");

const mockQuery = {};
const mockDB = {
    queryCategories: jest.fn(() => {
        const err = null;
        const categories = [];
        return [err, categories];
    }),
};

describe("query categories", () => {
    it("should return error with status 400 if page in query exists and is not a number", async () => {
        const query = { page: { index: 1 } };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(number).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is not a integer", async () => {
        const query = { page: 2.2 };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is less than 0", async () => {
        const query = { page: -1 };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(greater than).*(0).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not a number", async () => {
        const query = { limit: { count: 5 } };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(number).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not a integer", async () => {
        const query = { limit: 2.2 };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is less than 0", async () => {
        const query = { limit: -1 };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(limit).*(greater than).*(0).*/gi
            ),
        });
    });

    it("should return error with status 400 if query has any extra property", async () => {
        const query = { extraProperty: "extra property" };
        const [err, categories] = await queryCategories(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should query the database for related categories", async () => {
        await queryCategories(mockQuery, mockDB);
        expect(mockDB.queryCategories.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, categories] = await queryCategories(mockQuery, mockDB);
        expect(err).toBeNull();
    });
});
