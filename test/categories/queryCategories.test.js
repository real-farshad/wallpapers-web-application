const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/categories";

const mockQueryCategories = jest.fn(() => {
    const err = null;
    const categories = [];
    return [err, categories];
});

describe("GET - /api/categories", () => {
    it("should return error status 400 if page in query exists and is not a number", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ page: null });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is not a integer", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ page: 2.2 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is less than 0", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ page: -1 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is not a number", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ skip: null });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is not a integer", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ skip: 2.2 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is less than 0", async () => {
        const app = makeApp({});
        const response = await request(app).get(url).query({ skip: -1 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 500 if querying categories fails", async () => {
        const queryCategories = jest.fn(() => {
            const err = "operation failed!";
            const categories = [];
            return [err, categories];
        });
        const app = makeApp({ queryCategories });

        const response = await request(app).get(url);
        expect(response.statusCode).toBe(500);
    });

    it("should return status 200 if the query has been successful", async () => {
        const app = makeApp({ queryCategories: mockQueryCategories });
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(200);
    });
});
