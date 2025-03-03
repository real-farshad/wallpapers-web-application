const { ObjectId } = require("mongodb");
const updateWallpaper = require("../../wallpapers/updateWallpaper");

const mockId = String(new ObjectId());
const mockWallpaperUpdate = { title: "my wallpaper" };
const mockUserId = "123";
const mockDB = {
  findCategoryByTitle: jest.fn(() => {
    const err = null;
    const category = { title: "my category" };
    return [err, category];
  }),
  findAndUpdateUserWallpaper: jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
  }),
};

describe("update wallpaper", () => {
  it("should return error with status 400 if wallpaper id is not a valid id", async () => {
    const invalidWallpaperId = "123456789";
    const err = await updateWallpaper(invalidWallpaperId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid wallpaperId!",
    });
  });

  it("should return error with status 400 if wallpaper is an empty object", async () => {
    const wallpaperUpdate = {};
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(invalid).*(value).*/gi),
    });
  });

  it("should return error with status 400 if title exists and is not a string", async () => {
    const wallpaperUpdate = { title: 1 };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(string).*/gi),
    });
  });

  it("should return error with status 400 if title exists and is less than 3 characters long", async () => {
    const wallpaperUpdate = { title: "ab" };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(3 characters long).*/gi),
    });
  });

  it("should return error with status 400 if title exists and is more than 64 characters long", async () => {
    const longString = "a".repeat(65);
    const wallpaperUpdate = { title: longString };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(64 characters long).*/gi),
    });
  });

  it("should return error with status 400 if imageUrl exists and is not an object", async () => {
    const wallpaperUpdate = { imageUrl: 1 };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(imageUrl).*(object).*/gi),
    });
  });

  it("should return error with status 400 if imageUrl is an empty object", async () => {
    const wallpaperUpdate = { imageUrl: {} };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(invalid).*(value).*/gi),
    });
  });

  it("should return error with status 400 if imageUrl.thumbnail exists and is not a string", async () => {
    const wallpaperUpdate = { imageUrl: { thumbnail: 1 } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(imageUrl.thumbnail).*(string).*/gi),
    });
  });

  it("should return error with status 400 if imageUrl.thumbnail exists and is less than 3 characters long", async () => {
    const wallpaperUpdate = { imageUrl: { thumbnail: "ab" } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(imageUrl.thumbnail).*(3 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if imageUrl.thumbnail exists and is more than 256 characters long", async () => {
    const longString = "a".repeat(257);
    const wallpaperUpdate = { imageUrl: { thumbnail: longString } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(imageUrl.thumbnail).*(256 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if imageUrl.large exists and is not a string", async () => {
    const wallpaperUpdate = { imageUrl: { large: 1 } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(imageUrl.large).*(string).*/gi),
    });
  });

  it("should return error with status 400 if imageUrl.large exists and is less than 3 characters long", async () => {
    const wallpaperUpdate = { imageUrl: { large: "ab" } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(imageUrl.large).*(3 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if imageUrl.large exists and is more than 256 characters long", async () => {
    const longString = "a".repeat(257);
    const wallpaperUpdate = { imageUrl: { large: longString } };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(imageUrl.large).*(256 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if imageUrl has any extra properties", async () => {
    const wallpaperUpdate = { extraProperty: "extra property" };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(extraProperty).*(not).*(allowed).*/gi),
    });
  });

  it("should return error with status 400 if category exists and is not a string", async () => {
    const wallpaperUpdate = { category: 1 };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(string).*/gi),
    });
  });

  it("should return error with status 400 if category exists and is less than 3 characters", async () => {
    const wallpaperUpdate = { category: "ab" };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(3 characters long).*/gi),
    });
  });

  it("should return error with status 400 if category exists and is more than 32 characters", async () => {
    const longString = "a".repeat(33);
    const wallpaperUpdate = { category: longString };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(32 characters long).*/gi),
    });
  });

  it("should return error with status 400 if wallpaper has any extra properties", async () => {
    const wallpaperUpdate = { extraProperty: "extra property" };
    const err = await updateWallpaper(mockId, wallpaperUpdate);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(extraProperty).*(not).*(allowed).*/gi),
    });
  });

  it("should return error with status 404 if category exists but is not found in database", async () => {
    const wallpaperUpdate = { category: "my category" };
    const db = {
      findCategoryByTitle: jest.fn(() => {
        const err = null;
        const category = null;
        return [err, category];
      }),
    };
    const err = await updateWallpaper(mockId, wallpaperUpdate, mockUserId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(category).*(doesn't exist).*/gi),
    });
  });

  it("should return error with status 404 if there is no wallpaper with related id in database", async () => {
    const db = {
      findCategoryByTitle: mockDB.findCategoryByTitle,
      findAndUpdateUserWallpaper: jest.fn(() => {
        const err = null;
        const success = null;
        return [err, success];
      }),
    };
    const err = await updateWallpaper(
      mockId,
      mockWallpaperUpdate,
      mockUserId,
      db
    );
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(wallpaper).*(doesn't exist).*/gi),
    });
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await updateWallpaper(
      mockId,
      mockWallpaperUpdate,
      mockUserId,
      mockDB
    );
    expect(err).toBeNull();
  });
});
