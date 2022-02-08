const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/categories";

const mockCategory = { title: "new category title" };

const mockFindCategoryByTitle = jest.fn(() => {
    const err = null;
    const category = null;
    return [err, category];
});

const mockSaveCategory = jest.fn(() => {
    const err = null;
    return err;
});

describe("POST - /api/categories", () => {
    it("should return error status 400 if there is no title", async () => {
        const app = makeApp({});
        const response = await request(app).post(url);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .post(url)
            .send({ title: ["a", "b", "c"] });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is less than 3 characters", async () => {
        const app = makeApp({});
        const response = await request(app).post(url).send({ title: "ab" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if the title is more than 32 characters", async () => {
        const app = makeApp({});
        const longString = "a".repeat(33);
        const response = await request(app)
            .post(url)
            .send({ title: longString });

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 500 if finding category by title fails", async () => {
        const findCategoryByTitle = jest.fn(() => {
            const err = "operation failed!";
            const category = null;
            return [err, category];
        });
        const app = makeApp({ findCategoryByTitle });

        const response = await request(app).post(url).send(mockCategory);
        expect(response.statusCode).toBe(500);
    });

    it("should return error status 400 if a category with same title exists", async () => {
        const findCategoryByTitle = jest.fn(() => {
            const err = null;
            const category = { title: "same category title" };
            return [err, category];
        });
        const app = makeApp({ findCategoryByTitle });

        const response = await request(app)
            .post(url)
            .send({ title: "same category title" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 500 if saving category in database fails", async () => {
        const saveCategory = jest.fn(() => {
            const err = "operation failed!";
            return err;
        });
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            saveCategory,
        });

        const response = await request(app).post(url).send(mockCategory);
        expect(response.statusCode).toBe(500);
    });

    it("should return status 200 if the ctegory is valid and has been saved", async () => {
        const app = makeApp({
            findCategoryByTitle: mockFindCategoryByTitle,
            saveCategory: mockSaveCategory,
        });

        const response = await request(app).post(url).send(mockCategory);
        expect(response.statusCode).toBe(200);
    });
});
