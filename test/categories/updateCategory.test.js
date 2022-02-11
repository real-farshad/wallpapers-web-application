const request = require("supertest");
const makeApp = require("../../app");
const { ObjectId } = require("mongodb");

const mockId = new ObjectId();
const url = "/api/categories";
const validUrl = "/api/categories" + "/" + mockId;

const mockCategory = { title: "updated category title" };

const mockFindCategoryById = jest.fn(() => {
    const err = null;
    const category = { title: "category title" };
    return [err, category];
});

const mockFindCategoryByTitle = jest.fn(() => {
    const err = null;
    const category = null;
    return [err, category];
});

const mockUpdateCategory = jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
});

describe("PUT - /api/categories/:id", () => {
    it("should return error status 400 if category id is not a valid id", async () => {
        const app = makeApp({});
        const invalidId = "123456789";
        const response = await request(app).put(url + "/" + invalidId);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if request body doesn't have category title in it", async () => {
        const app = makeApp({});
        const response = await request(app).put(validUrl);
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category title is not a string", async () => {
        const app = makeApp({});
        const response = await request(app)
            .put(validUrl)
            .send({ title: ["a", "b", "c"] });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category title is less than 3 characters", async () => {
        const app = makeApp({});
        const response = await request(app).put(validUrl).send({ title: "ab" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if category title is more than 32 characters", async () => {
        const app = makeApp({});
        const longString = "a".repeat(33);
        const response = await request(app)
            .put(validUrl)
            .send({ title: longString });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 404 if there is no category with related id", async () => {
        const findCategoryById = jest.fn(() => {
            const err = null;
            const category = null;
            return [err, category];
        });
        const app = makeApp({ findCategoryById });
        const response = await request(app).put(validUrl).send(mockCategory);
        expect(response.statusCode).toBe(404);
    });

    it("should return error status 400 if category title is the same", async () => {
        const findCategoryById = jest.fn(() => {
            const err = null;
            const category = { title: "same category title" };
            return [err, category];
        });
        const app = makeApp({ findCategoryById });
        const response = await request(app)
            .put(validUrl)
            .send({ title: "same category title" });
        expect(response.statusCode).toBe(400);
    });

    it("should return error status 400 if new category title is not unique", async () => {
        const findCategoryByTitle = jest.fn(() => {
            const err = null;
            const category = { title: "same category title" };
            return [err, category];
        });
        const app = makeApp({
            findCategoryById: mockFindCategoryById,
            findCategoryByTitle,
        });
        const response = await request(app).put(validUrl).send(mockCategory);
        expect(response.statusCode).toBe(400);
    });

    it("should return status 404 if there is no category with such id", async () => {
        const updateCategory = jest.fn(() => {
            const err = null;
            const success = false;
            return [err, success];
        });
        const app = makeApp({
            findCategoryById: mockFindCategoryById,
            findCategoryByTitle: mockFindCategoryByTitle,
            updateCategory,
        });
        const response = await request(app).put(validUrl).send(mockCategory);
        expect(response.statusCode).toBe(404);
    });

    it("should return status 200 if update was successful", async () => {
        const app = makeApp({
            findCategoryById: mockFindCategoryById,
            findCategoryByTitle: mockFindCategoryByTitle,
            updateCategory: mockUpdateCategory,
        });
        const response = await request(app).put(validUrl).send(mockCategory);
        expect(response.statusCode).toBe(200);
    });
});
