const { ObjectId } = require("mongodb");
const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/wallpapers";
const mockId = new ObjectId();
const validUrl = "/api/wallpapers" + "/" + mockId;

const mockFindAndDeleteWallpaper = jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
});

describe("DELETE - /api/wallpapers/:id", () => {
    it("should return error status 400 if wallpaper id is not a valid id", async () => {
        const app = makeApp({});
        const invalidId = "123456789";

        const response = await request(app).delete(url + "/" + invalidId);

        expect(response.statusCode).toBe(400);
    });

    it("should return error status 404 if there is no wallpaper with related id", async () => {
        const findAndDeleteWallpaper = jest.fn(() => {
            const err = null;
            const success = false;
            return [err, success];
        });
        const app = makeApp({ findAndDeleteWallpaper });

        const response = await request(app).delete(validUrl);

        expect(response.statusCode).toBe(404);
    });

    it("should return status 200 if operation was successfull", async () => {
        const app = makeApp({
            findAndDeleteWallpaper: mockFindAndDeleteWallpaper,
        });

        const response = await request(app).delete(validUrl);

        expect(response.statusCode).toBe(200);
    });
});
