const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/wallpapers";

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

const mockFindCategoryByTitle = jest.fn(() => {
    const err = null;
    const category = { title: "my category" };
    return [err, category];
});

const mockSaveWallpaper = jest.fn(() => {
    const err = null;
    return err;
});

describe("POST - /api/wallpapers", () => {
    it("should return error status 400 if there is no title", async () => {
        const app = makeApp({});

        const response = await request(app).post(url);

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ title: ["a", "b", "c"] });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title is less than 3 characters long", async () => {
        const app = makeApp({});

        const response = await request(app).post(url).send({ title: "ab" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title is more than 64 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(65);

        const response = await request(app)
            .post(url)
            .send({ title: longString });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is no imageUrl", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl is not an object", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: "not an object" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is no imageUrl.thumbnail", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: {} });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: { thumbnail: ["a", "b", "c"] } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail is less than 3 characters long", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: { thumbnail: "ab" } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail is more than 256 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(257);

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: { thumbnail: longString } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is no imageUrl.large", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, imageUrl: { ...mockThumbnailImageUrl } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                imageUrl: {
                    ...mockThumbnailImageUrl,
                    large: ["a", "b", "c"],
                },
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large is less than 3 characters long", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                imageUrl: {
                    ...mockThumbnailImageUrl,
                    large: "ab",
                },
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large is more than 256 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(257);

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                imageUrl: {
                    ...mockThumbnailImageUrl,
                    large: longString,
                },
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl has any extra properties", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                imageUrl: {
                    ...mockThumbnailImageUrl,
                    ...mockLargeImageUrl,
                    extraLarge: "extra property",
                },
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is no category", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockTitle, ...mockImageUrl });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                ...mockImageUrl,
                category: ["a", "b", "c"],
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category is less than 3 characters", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                ...mockImageUrl,
                category: "ab",
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category is more than 32 characters", async () => {
        const app = makeApp({});
        const longString = "a".repeat(33);

        const response = await request(app)
            .post(url)
            .send({
                ...mockTitle,
                ...mockImageUrl,
                category: longString,
            });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is any extra property", async () => {
        const app = makeApp({});

        const response = await request(app)
            .post(url)
            .send({ ...mockWallpaper, description: "extra property" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 404 if category doesn't exist", async () => {
        const findCategoryByTitle = jest.fn(() => {
            const err = null;
            const category = null;
            return [err, category];
        });
        const app = makeApp({ findCategoryByTitle });

        const response = await request(app).post(url).send(mockWallpaper);

        expect(response.statusCode).toBe(404);
    });

    it("should save the wallpaper", async () => {
        const saveWallpaper = jest.fn();
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            saveWallpaper,
        });

        await request(app).post(url).send(mockWallpaper);

        expect(saveWallpaper.mock.calls.length).toBe(1);
    });

    it("should return status 200 if operation was successful", async () => {
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            saveWallpaper: mockSaveWallpaper,
        });

        const response = await request(app).post(url).send(mockWallpaper);

        expect(response.statusCode).toBe(200);
    });
});
