const { ObjectId } = require("mongodb");
const createComment = require("../../comments/createComment");

const mockDescription = { description: "my comment" };
const mockWallpaperId = { wallpaperId: String(new ObjectId()) };
const mockComment = { ...mockDescription, ...mockWallpaperId };

const mockUserId = String(new ObjectId());

const mockDB = {
  findWallpaperById: jest.fn(() => {
    const err = null;
    const wallpaper = { title: "my wallpaper" };
    return [err, wallpaper];
  }),
  saveComment: jest.fn(() => {
    const err = null;
    return err;
  }),
};

describe("create comment", () => {
  it("should return error with status 400 if there is no description", async () => {
    const comment = {};
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(description).*(required).*/gi),
    });
  });

  it("should return error with status 400 if description is not a string", async () => {
    const comment = { description: 1 };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(description).*(string).*/gi),
    });
  });

  it("should return error with status 400 if description is less than 3 characters long", async () => {
    const comment = { description: "ab" };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(description).*(3 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if description is more than 256 characters long", async () => {
    const longString = "a".repeat(257);
    const comment = { description: longString };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(description).*(256 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if there is no wallpaperId", async () => {
    const comment = { ...mockDescription };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(wallpaperId).*(required).*/gi),
    });
  });

  it("should return error with status 400 if wallpaperId is not a string", async () => {
    const comment = { ...mockDescription, wallpaperId: 1 };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(wallpaperId).*(string).*/gi),
    });
  });

  it("should return error with status 400 if wallpaperId is less than 3 characters long", async () => {
    const comment = { ...mockDescription, wallpaperId: "ab" };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(wallpaperId).*(3 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if wallpaperId is more than 64 characters long", async () => {
    const longString = "a".repeat(65);
    const comment = { ...mockDescription, wallpaperId: longString };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(
        /.*(wallpaperId).*(64 characters long).*/gi
      ),
    });
  });

  it("should return error with status 400 if wallpaperId is not a valid id", async () => {
    const comment = { ...mockDescription, wallpaperId: "123456789" };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid wallpaperId!",
    });
  });

  it("should return error with status 400 if comment has any extra properties", async () => {
    const comment = { ...mockComment, extraProperty: "extra property" };
    const err = await createComment(comment);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(extraProperty).*(not).*(allowed).*/gi),
    });
  });

  it("should return error with status 404 if wallpaper doesn't exist", async () => {
    const db = {
      findWallpaperById: jest.fn(() => {
        const err = null;
        const wallpaper = null;
        return [err, wallpaper];
      }),
    };
    const err = await createComment(mockComment, mockUserId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(wallpaper).*(doesn't exist).*/gi),
    });
  });

  it("should save the comment in database", async () => {
    await createComment(mockComment, mockUserId, mockDB);
    expect(mockDB.saveComment.mock.calls.length).toBe(1);
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await createComment(mockComment, mockUserId, mockDB);
    expect(err).toBeNull();
  });
});
