const request = require("supertest");
const makeApp = require("../app");

const url = "/api/categories";

let findCategoryByTitle;
let saveCategory;
let app;

beforeEach(() => {
    findCategoryByTitle = jest.fn(() => [null, null]);
    saveCategory = jest.fn(() => null);
    app = makeApp({ findCategoryByTitle, saveCategory });
});

describe("POST - /api/categories", () => {
    it("should not return error status 404", async () => {
        const response = await request(app).post(url);
        expect(response.statusCode).not.toBe(404);
    });

    it("should return error status 400 if there is no request body", async () => {
        const response = await request(app).post(url);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if there is no title", async () => {
        const response = await request(app).post(url);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is not a string", async () => {
        const response = await request(app)
            .post(url)
            .send({ title: ["a", "b", "c"] });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is less than 3 characters", async () => {
        const response = await request(app).post(url).send({ title: "ab" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is more than 33 characters", async () => {
        const longString = "a".repeat(33);
        const response = await request(app)
            .post(url)
            .send({ title: longString });

        expect(response.statusCode).toBe(400);
    });

    it("should check for unique title in db", async () => {
        await request(app).post(url).send({ title: "new category" });
        expect(findCategoryByTitle.mock.calls.length).toBe(1);
    });

    it("should save the unique category in db", async () => {
        await request(app).post(url).send({ title: "new category" });
        expect(saveCategory.mock.calls.length).toBe(1);
    });

    it("should return status code 200 if the ctegory is valid and has been saved", async () => {
        const response = await request(app)
            .post(url)
            .send({ title: "new category" });

        expect(response.statusCode).toBe(200);
    });
});
