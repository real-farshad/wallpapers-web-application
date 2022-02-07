const request = require("supertest");
const makeApp = require("../../app");
const { ObjectId } = require("mongodb");

const mockId = new ObjectId();
const url = "/api/categories";
const validUrl = "/api/categories" + "/" + mockId;

const mockFindAndDeleteCategory = jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
});

describe("DELETE - /api/categories/:id", () => {
    it("should return error status 400 if category id is not a valid id", async () => {
        const app = makeApp({});
        const invalidId = "123456789";
        const response = await request(app).delete(url + "/" + invalidId);

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 500 find and delete operation on database fails", async () => {
        const findAndDeleteCategory = jest.fn(() => {
            const err = "operation failed!";
            const success = false;
            return [err, success];
        });
        const app = makeApp({ findAndDeleteCategory });
        const response = await request(app).delete(validUrl);

        expect(response.statusCode).toBe(500);
    });

    it("should return error status 404 if category with related id doesn't exist", async () => {
        const findAndDeleteCategory = jest.fn(() => {
            const err = null;
            const success = false;
            return [err, success];
        });
        const app = makeApp({ findAndDeleteCategory });
        const response = await request(app).delete(validUrl);

        expect(response.statusCode).toBe(404);
    });

    it("should return status 200 if category deleted successfully", async () => {
        const app = makeApp({
            findAndDeleteCategory: mockFindAndDeleteCategory,
        });
        const response = await request(app).delete(validUrl);

        expect(response.statusCode).toBe(200);
    });
});
