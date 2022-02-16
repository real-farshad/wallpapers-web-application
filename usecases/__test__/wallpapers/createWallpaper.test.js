const createWallpaper = require("../../wallpapers/createWallpaper");

const mockTitle = { title: "my wallpaper" };
const mockThumbnailImageUrl = { thumbnail: "http://thumbnail_image.com" };
const mockLargeImageUrl = { large: "http://large_image.com" };
const mockImageUrl = {
    imageUrl: {
        ...mockThumbnailImageUrl,
        ...mockLargeImageUrl,
    },
};
const mockCategory = { category: "my category" };
const mockWallpaper = { ...mockTitle, ...mockImageUrl, ...mockCategory };
const mockUserId = "1";
const mockDB = {
    findCategoryByTitle: jest.fn(() => {
        const err = null;
        const category = { title: "my category" };
        return [err, category];
    }),
    saveWallpaper: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create wallpaper", () => {
    it("should return error with status 400 if there is no title", async () => {
        const wallpaper = {};
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(required).*/gi),
        });
    });

    it("should return error with status 400 if title is not a string", async () => {
        const wallpaper = { title: 1 };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if title is less than 3 characters long", async () => {
        const wallpaper = { title: "ab" };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if title is more than 64 characters long", async () => {
        const longString = "a".repeat(65);
        const wallpaper = { title: longString };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(64 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if there is no imageUrl", async () => {
        const wallpaper = { ...mockTitle };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(imageUrl).*(required).*/gi),
        });
    });

    it("should return error with status 400 if imageUrl is not an object", async () => {
        const wallpaper = { ...mockTitle, imageUrl: 1 };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(imageUrl).*(object).*/gi),
        });
    });

    it("should return error with status 400 if there is no imageUrl.thumbnail", async () => {
        const wallpaper = { ...mockTitle, imageUrl: {} };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.thumbnail).*(required).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl.thumbnail is not a string", async () => {
        const wallpaper = { ...mockTitle, imageUrl: { thumbnail: 1 } };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.thumbnail).*(string).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl.thumbnail is less than 3 characters long", async () => {
        const wallpaper = { ...mockTitle, imageUrl: { thumbnail: "ab" } };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.thumbnail).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl.thumbnail is more than 256 characters long", async () => {
        const longString = "a".repeat(257);
        const wallpaper = { ...mockTitle, imageUrl: { thumbnail: longString } };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.thumbnail).*(256 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if there is no imageUrl.large", async () => {
        const wallpaper = {
            ...mockTitle,
            imageUrl: { ...mockThumbnailImageUrl },
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.large).*(required).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl.large is not a string", async () => {
        const wallpaper = {
            ...mockTitle,
            imageUrl: { ...mockThumbnailImageUrl, large: 1 },
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(imageUrl.large).*(string).*/gi),
        });
    });

    it("should return error with status 400 if imageUrl.large is less than 3 characters long", async () => {
        const wallpaper = {
            ...mockTitle,
            imageUrl: { ...mockThumbnailImageUrl, large: "ab" },
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.large).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl.large is more than 256 characters long", async () => {
        const longString = "a".repeat(257);
        const wallpaper = {
            ...mockTitle,
            imageUrl: { ...mockThumbnailImageUrl, large: longString },
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(imageUrl.large).*(256 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if imageUrl has any extra properties", async () => {
        const wallpaper = {
            ...mockTitle,
            imageUrl: {
                ...mockThumbnailImageUrl,
                ...mockLargeImageUrl,
                extraProperty: "extra property",
            },
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 400 if there is no category", async () => {
        const wallpaper = { ...mockTitle, ...mockImageUrl };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(category).*(required).*/gi),
        });
    });

    it("should return error with status 400 if category is not a string", async () => {
        const wallpaper = { ...mockTitle, ...mockImageUrl, category: 1 };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(category).*(string).*/gi),
        });
    });

    it("should return error with status 400 if category is less than 3 characters long", async () => {
        const wallpaper = { ...mockTitle, ...mockImageUrl, category: "ab" };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(category).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category is more than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const wallpaper = {
            ...mockTitle,
            ...mockImageUrl,
            category: longString,
        };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(category).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if wallpaper has any extra properties", async () => {
        const wallpaper = { ...mockWallpaper, extraProperty: "extra property" };
        const err = await createWallpaper(wallpaper);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 404 if category doesn't exist", async () => {
        const db = {
            findCategoryByTitle: jest.fn(() => {
                const err = null;
                const category = null;
                return [err, category];
            }),
        };
        const err = await createWallpaper(mockWallpaper, mockUserId, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(/.*(category).*(doesn't exist).*/gi),
        });
    });

    it("should save the wallpaper in database", async () => {
        await createWallpaper(mockWallpaper, mockUserId, mockDB);
        expect(mockDB.saveWallpaper.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createWallpaper(mockWallpaper, mockUserId, mockDB);
        expect(err).toBeNull();
    });
});
