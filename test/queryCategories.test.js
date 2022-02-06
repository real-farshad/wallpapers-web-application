const request = require("supertest");
const makeApp = require("../app");

const url = "/api/categories";

let queryCategories;
let app;

beforeEach(() => {
    queryCategories = jest.fn(() => [null, []]);
    app = makeApp({ queryCategories });
});

describe("GET - /api/categories", () => {
    it("should not return error status 404", async () => {
        const response = await request(app).get(url);
        expect(response.statusCode).not.toBe(404);
    });

    it("should return error status 400 if page in query exists and is not a number", async () => {
        const response = await request(app).get(url).query({ page: null });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is not a integer", async () => {
        const response = await request(app).get(url).query({ page: 2.2 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if page in query exists and is less than 0", async () => {
        const response = await request(app).get(url).query({ page: -1 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is not a number", async () => {
        const response = await request(app).get(url).query({ skip: null });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is not a integer", async () => {
        const response = await request(app).get(url).query({ skip: 2.2 });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if skip in query exists and is less than 0", async () => {
        const response = await request(app).get(url).query({ skip: -1 });
        expect(response.statusCode).toBe(400);
    });

    it("should query database if the query is valid", async () => {
        const response = await request(app).get(url);
        expect(queryCategories.mock.calls.length).toBe(1);
    });

    it("should return status 200 if the query has been successful", async () => {
        const response = await request(app).get(url);
        expect(response.statusCode).toBe(200);
    });
});
