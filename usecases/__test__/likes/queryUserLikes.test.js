const { ObjectId } = require("mongodb");
const queryUserLikes = require("../../likes/queryUserLikes");

const mockQuery = {};
const mockUserId = String(new ObjectId());
const mockDB = {
    queryUserLikes: jest.fn(() => {
        const err = null;
        const likes = [];
        return [err, likes];
    }),
};

describe("query user likes", () => {
    it("should return error with status 400 if page in query exists and is not a number", async () => {
        const query = { page: { index: 1 } };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(number).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is not a integer", async () => {
        const query = { page: 2.2 };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is less than 0", async () => {
        const query = { page: -1 };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(greater than).*(0).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not a number", async () => {
        const query = { limit: { count: 5 } };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(number).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not a integer", async () => {
        const query = { limit: 2.2 };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is less than 0", async () => {
        const query = { limit: -1 };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(limit).*(greater than).*(0).*/gi
            ),
        });
    });

    it("should return error with status 400 if query has any extra properties", async () => {
        const query = { extraProperty: "extra property" };
        const [err, likes] = await queryUserLikes(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should query the database for user likes", async () => {
        await queryUserLikes(mockQuery, mockUserId, mockDB);
        expect(mockDB.queryUserLikes.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, likes] = await queryUserLikes(
            mockQuery,
            mockUserId,
            mockDB
        );
        expect(err).toBeNull();
    });
});
