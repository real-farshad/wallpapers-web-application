const getWallpapersCount = require("../../wallpapers/getWallpapersCount");

const mockQuery = {};
const mockDB = {
  getWallpapersCount: jest.fn(() => {
    const err = null;
    const wallpapersCount = 5;
    return [err, wallpapersCount];
  }),
};

describe("count matching wallpapers", () => {
  it("should return error with status 400 if query.title exists and is not a string", async () => {
    const query = { title: { text: "my title" } };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(string).*/gi),
    });
  });

  it("should return error with status 400 if query.title exists and is less than 3 characters long", async () => {
    const query = { title: "ab" };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(3 characters long).*/gi),
    });
  });

  it("should return error with status 400 if query.title exists and is more than 64 characters long", async () => {
    const longString = "a".repeat(65);
    const query = { title: longString };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(title).*(64 characters long).*/gi),
    });
  });

  it("should return error with status 400 if query.category exists and is not a string", async () => {
    const query = { category: { text: "my category" } };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(string).*/gi),
    });
  });

  it("should return error with status 400 if query.category exists and is less than 3 characters long", async () => {
    const query = { category: "ab" };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(3 characters long).*/gi),
    });
  });

  it("should return error with status 400 if query.category exists and is more than 32 characters long", async () => {
    const longString = "a".repeat(33);
    const query = { category: longString };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(category).*(32 characters long).*/gi),
    });
  });

  it("should return error with status 400 if query.duration exists and is not '2020' or '2021'", async () => {
    const query = { duration: "2022" };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(duration).*(2021).*(2020).*/gi),
    });
  });

  it("should return error with status 400 if query has any extra properties", async () => {
    const query = { extraProperty: "extra property" };
    const [err, wallpapersCount] = await getWallpapersCount(query);
    expect(err).toMatchObject({
      status: 400,
      message: expect.stringMatching(/.*(extraProperty).*(not).*(allowed).*/gi),
    });
  });

  it("should query the database for related wallpapers", async () => {
    await getWallpapersCount(mockQuery, mockDB);
    expect(mockDB.getWallpapersCount.mock.calls.length).toBe(1);
  });

  it("should return null as error if the operation was successful", async () => {
    const [err, wallpapersCount] = await getWallpapersCount(mockQuery, mockDB);
    expect(err).toBeNull();
  });
});
