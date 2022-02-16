const queryWallpapers = require("../../wallpapers/queryWallpapers");

const mockQuery = {};
const mockDB = {
    queryWallpapers: jest.fn(() => {
        const err = null;
        const wallpapers = [];
        return [err, wallpapers];
    }),
};

describe("query wallpapers", () => {
    it("should return error with status 400 if title in query exists and is not a string", async () => {
        const query = { title: { text: "my title" } };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if title in query exists and is less than 3 characters long", async () => {
        const query = { title: "ab" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if title in query exists and is more than 64 characters long", async () => {
        const longString = "a".repeat(65);
        const query = { title: longString };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(64 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category in query exists and is not a string", async () => {
        const query = { category: { text: "my category" } };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(category).*(string).*/gi),
        });
    });

    it("should return error with status 400 if category in query exists and is less than 3 characters long", async () => {
        const query = { category: "ab" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(category).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category in query exists and is more than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const query = { category: longString };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(category).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if duration in query exists and is not '2020' or '2021'", async () => {
        const query = { duration: "2022" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(duration).*(2021).*(2020).*/gi),
        });
    });

    it("should return error with status 400 if sort in query exists and is 'new' or 'popular'", async () => {
        const query = { sort: "best" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(sort).*(new).*(popular).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is not a number", async () => {
        const query = { page: "first" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(number).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is not an integer", async () => {
        const query = { page: 2.2 };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if page in query exists and is less than 0", async () => {
        const query = { page: -1 };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(page).*(greater than).*(0).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not a number", async () => {
        const query = { limit: "five" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(number).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is not an integer", async () => {
        const query = { limit: 2.2 };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(integer).*/gi),
        });
    });

    it("should return error with status 400 if limit in query exists and is less than 0", async () => {
        const query = { limit: -1 };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(limit).*(greater than).*(0).*/gi
            ),
        });
    });

    it("should return error with status 400 if limit in query exists and is greater than 20", async () => {
        const query = { limit: 21 };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(limit).*(less than).*(0).*/gi),
        });
    });

    it("should return error with status 400 if query has any extra properties", async () => {
        const query = { extraProperty: "extra property" };
        const [err, wallpapers] = await queryWallpapers(query);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should query the database for related wallpapers", async () => {
        await queryWallpapers(mockQuery, mockDB);
        expect(mockDB.queryWallpapers.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const [err, wallpapers] = await queryWallpapers(mockQuery, mockDB);
        expect(err).toBeNull();
    });
});
