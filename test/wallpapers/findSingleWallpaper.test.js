const { ObjectId } = require("mongodb");
const request = require("supertest");
const makeApp = require("../../app");

const url = "/api/wallpapers";
const mockId = new ObjectId();
const validUrl = "/api/wallpapers" + "/" + mockId;

const mockFindSingleWallpapers = jest.fn(() => {
    const err = null;
    const wallpaper = { title: "my wallpaper" };
    return [err, wallpaper];
});

describe("GET - /api/wallpapers/:id", () => {
    it("should return error status 400 if wallpaper id is not a valid id", async () => {
        const app = makeApp({});
        const invalidId = "123456789";

        const response = await request(app).get(url + "/" + invalidId);

        expect(response.statusCode).toBe(400);
    });

    it("should query database for related wallpaper", async () => {
        const app = makeApp({ findSingleWallpaper: mockFindSingleWallpapers });

        await request(app).get(validUrl);

        expect(mockFindSingleWallpapers.mock.calls.length).toBe(1);
    });

    it("should return error status 404 if there is no post with related id in the database", async () => {
        const findSingleWallpaper = jest.fn(() => {
            const err = null;
            const wallpaper = null;
            return [err, wallpaper];
        });
        const app = makeApp({ findSingleWallpaper });

        const response = await request(app).get(validUrl);

        expect(response.statusCode).toBe(404);
    });

    it("should return status 200 if operation was successfull", async () => {
        const app = makeApp({ findSingleWallpaper: mockFindSingleWallpapers });

        const response = await request(app).get(validUrl);

        expect(response.statusCode).toBe(200);
    });
});
