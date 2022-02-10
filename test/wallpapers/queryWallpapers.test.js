const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/wallpapers";

const mockQueryWallpapers = jest.fn(() => {
    const err = null;
    const wallpapers = [];
    return [err, wallpapers];
});

describe("GET - /api/wallpapers", () => {
    it("should return error status 400 if title in query exists and is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .get(url)
            .query({ title: { text: "my title" } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title in query exists and is less than 3 characters long", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ title: "ab" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if title in query exists and is more than 64 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(65);

        const response = await request(app)
            .get(url)
            .query({ title: longString });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category in query exists and is not a string", async () => {
        const app = makeApp({});

        const response = await request(app)
            .get(url)
            .query({ category: { title: "my category" } });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category in query exists and is less than 3 characters long", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ category: "ab" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category in query exists and is more than 32 characters long", async () => {
        const app = makeApp({});
        const longString = "a".repeat(33);

        const response = await request(app)
            .get(url)
            .query({ category: longString });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if duration in query exists and is not '2020' or '2021'", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ duration: 2022 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if sort in query exists and is 'new' or 'popular'", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ sort: "best" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is not a number", async () => {
        const app = makeApp({});

        const response = await request(app)
            .get(url)
            .query({ page: "last page" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is not an integer", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ page: 2.3 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is less than 0", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ page: -1 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if limit in query exists and is not a number", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ limit: "three" });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if limit in query exists and is not an integer", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ limit: 2.3 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if limit in query exists and is less than 0", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ limit: -1 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if limit in query exists and is greater than 20", async () => {
        const app = makeApp({});

        const response = await request(app).get(url).query({ limit: 21 });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if query has any unwanted properties", async () => {
        const app = makeApp({});

        const response = await request(app)
            .get(url)
            .query({ description: "extra" });

        expect(response.statusCode).toBe(400);
    });

    it("should query database for related wallpapers", async () => {
        const app = makeApp({ queryWallpapers: mockQueryWallpapers });

        await request(app).get(url);

        expect(mockQueryWallpapers.mock.calls.length).toBe(1);
    });

    it("should return status 200 if operation was successful", async () => {
        const app = makeApp({ queryWallpapers: mockQueryWallpapers });

        const response = await request(app).get(url);

        expect(response.statusCode).toBe(200);
    });
});
