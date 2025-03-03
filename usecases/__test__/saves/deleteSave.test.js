const { ObjectId } = require("mongodb");
const deleteSave = require("../../saves/deleteSave");

const mockWallpaperId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
  findAndDeleteUserSave: jest.fn(() => {
    const err = null;
    const save = { wallpaperId: String(new ObjectId()) };
    return [err, save];
  }),
};

describe("delete save", () => {
  it("should return error with status 400 if wallpaperId is not a valid id", async () => {
    const wallpaperId = "1";
    const err = await deleteSave(wallpaperId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid wallpaperId!",
    });
  });

  it("should return error with status 404 if user save doesn't exist", async () => {
    const db = {
      findAndDeleteUserSave: jest.fn(() => {
        const err = null;
        const save = null;
        return [err, save];
      }),
    };
    const err = await deleteSave(mockWallpaperId, mockUserId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(save).*(doesn't exist).*/gi),
    });
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await deleteSave(mockWallpaperId, mockUserId, mockDB);
    expect(err).toBeNull();
  });
});
