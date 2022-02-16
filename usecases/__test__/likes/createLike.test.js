const { ObjectId } = require("mongodb");
const createLike = require("../../likes/createLike");

const mockLike = { postId: String(new ObjectId()) };
const mockUser = { userId: String(new ObjectId()) };
const mockDB = {
    findPostById: jest.fn(() => {
        const err = null;
        const post = { title: "related post" };
        return [err, post];
    }),
    findUserLike: jest.fn(() => {
        const err = null;
        const like = null;
        return [err, like];
    }),
    saveLike: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create like", () => {
    it("should return error with status 400 if postId doesn't exist", async () => {
        const like = {};
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(postId).*(required).*/gi),
        });
    });

    it("should return error with status 400 if postId is not a string", async () => {
        const like = { postId: 1 };
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(postId).*(string).*/gi),
        });
    });

    it("should return error with status 400 if postId is less than 3 characters", async () => {
        const like = { postId: "ab" };
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(postId).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if postId is more than 64 characters", async () => {
        const longString = "a".repeat(65);
        const like = { postId: longString };
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(postId).*(64 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if postId is not a valid id", async () => {
        const like = { postId: "123456789" };
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(postId).*(not).*(valid).*/gi),
        });
    });

    it("should return error with status 400 if like has any extra properties", async () => {
        const like = { ...mockLike, extraProperty: "extra property" };
        const err = await createLike(like);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 400 if related post doesn't exist", async () => {
        const db = {
            findPostById: jest.fn(() => {
                const err = null;
                const post = null;
                return [err, post];
            }),
        };
        const err = await createLike(mockLike, mockUser, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(post).*(doesn't exist).*/gi),
        });
    });

    it("should return error with status 400 if post has already been liked", async () => {
        const db = {
            ...mockDB,
            findUserLike: jest.fn(() => {
                const err = null;
                const like = { postId: String(new ObjectId()) };
                return [err, like];
            }),
        };
        const err = await createLike(mockLike, mockUser, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(post).*(liked).*/gi),
        });
    });

    it("should save the like in database", async () => {
        await createLike(mockLike, mockUser, mockDB);
        expect(mockDB.saveLike.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createLike(mockLike, mockUser, mockDB);
        expect(err).toBeNull();
    });
});
