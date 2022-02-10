const { ObjectId } = require("mongodb");
const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/wallpapers";
const mockId = new ObjectId();
const validUrl = "/api/wallpapers" + "/" + mockId;

const mockTitle = { title: "my wallpaper" };
const mockCategory = { category: "my category" };

const mockFindCategoryByTitle = jest.fn(() => {
    const err = null;
    const category = { title: "my category" };
    return [err, category];
});

const mockFindAndUpdateWallpaper = jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
});

describe("PUT - /api/wallpapers/:id", () => {
    it("should return error status 400 if wallpaper id is not a valid id", async () => {
        const app = makeApp({});
        const invalidId = "123456789";

        const response = await request(app).put(url + "/" + invalidId);

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if wallpaper is an empty object", async () => {
        const app = makeApp({});
        const response = await request(app).put(validUrl);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title exists and is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ title: { text: "my title" } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title exists and is less than 3 characters long", async () => {
        const app = makeApp({});
        const response = await request(app).put(validUrl).send({ title: "ab" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title exists and is more than 64 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(65);
        const response = await request(app)
            .put(validUrl)
            .send({ title: longString });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl exists and is not an object", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: "not an object" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl is an empty object", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: {} });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail exists and is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { thumbnail: { url: "image url" } } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail exists and is less than 3 characters long", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { thumbnail: "ab" } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.thumbnail exists and is more than 256 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(257);
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { thumbnail: longString } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large exists and is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { large: { url: "image url" } } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large exists and is less than 3 characters long", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { large: "ab" } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl.large exists and is more than 256 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(257);
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { large: longString } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if imageUrl has any extra properties", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ imageUrl: { other: "extra property" } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category exists and is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ category: { text: "my category" } });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category exists and is less than 3 characters", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ category: "ab" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category exists and is more than 32 characters", async () => {
        const app = makeApp({});
        const longString = "a".repeat(33);
        const response = await request(app)
            .put(validUrl)
            .send({ category: longString });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is any extra property in wallpaper", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ other: "extra property" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 404 if category exists but is not found in database", async () => {
        const findCategoryByTitle = jest.fn(() => {
            const err = null;
            const category = null;
            return [err, category];
        });
        const app = makeApp({ findCategoryByTitle });
        const response = await request(app).put(validUrl).send(mockCategory);
        expect(response.statusCode).toBe(404);
    });

    it("should return error status 404 if there is no wallpaper with related id in database", async () => {
        const findAndUpdateWallpaper = jest.fn(() => {
            const err = null;
            const success = false;
            return [err, success];
        });
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            findAndUpdateWallpaper,
        });
        const response = await request(app).put(validUrl).send(mockTitle);
        expect(response.statusCode).toBe(404);
    });

    it("should return status 200 if operation was successful", async () => {
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            findAndUpdateWallpaper: mockFindAndUpdateWallpaper,
        });
        const response = await request(app).put(validUrl).send(mockTitle);
        expect(response.statusCode).toBe(200);
    });
});
