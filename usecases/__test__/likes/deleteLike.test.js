const { ObjectId } = require("mongodb");
const deleteLike = require("../../likes/deleteLike");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
  findAndDeleteUserLike: jest.fn(() => {
    const err = null;
    const like = { wallpaperId: String(new ObjectId()) };
    return [err, like];
  }),
  decrementWallpaperLikeCount: jest.fn(() => {
    const err = null;
    return err;
  }),
};

describe("delete like", () => {
  it("should return error with status 400 if wallpaperId is not a valid id", async () => {
    const wallpaperId = "1";
    const err = await deleteLike(wallpaperId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid wallpaperId!",
    });
  });

  it("should return error with status 404 if user like doesn't exist", async () => {
    const db = {
      findAndDeleteUserLike: jest.fn(() => {
        const err = null;
        const like = null;
        return [err, like];
      }),
    };
    const err = await deleteLike(mockWallpaperId, mockUserId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(like).*(doesn't exist).*/gi),
    });
  });

  it("should decrement wallpapers like", async () => {
    await deleteLike(mockWallpaperId, mockUserId, mockDB);
    expect(mockDB.decrementWallpaperLikeCount.mock.calls.length).toBe(1);
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await deleteLike(mockWallpaperId, mockUserId, mockDB);
    expect(err).toBeNull();
  });
});
