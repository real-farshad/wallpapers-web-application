const { ObjectId } = require("mongodb");
const createCollectionRecord = require("../../collectionsRecords/createCollectionRecord");

const mockCollectionRecord = {
  collectionId: String(new ObjectId()),
  wallpaperId: String(new ObjectId()),
};
const mockUserId = String(new ObjectId());
const mockDB = {
  findUserCollection: jest.fn(() => {
    const err = null;
    const collection = { title: "my collection" };
    return [err, collection];
  }),
  saveCollectionRecord: jest.fn(() => {
    const err = null;
    return err;
  }),
  incrementCollectionWallpaperCount: jest.fn(() => {
    const err = null;
    return err;
  }),
};

describe("create collection record", () => {
  it("should return error with status 400 if collectionRecord.collectionId is not a valid id", async () => {
    const invalidId = "123456789";
    const err = await createCollectionRecord(invalidId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid collectionId!",
    });
  });

  it("should return error with status 400 if collectionRecord.wallpaperId is not a valid id", async () => {
    const invalidId = "123456789";
    const collectionRecord = {
      ...mockCollectionRecord,
      wallpaperId: invalidId,
    };
    const err = await createCollectionRecord(collectionRecord);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid wallpaperId!",
    });
  });

  it("should return error status 404 if a collection with this id, made by this user, doesn't exist", async () => {
    const db = {
      findUserCollection: jest.fn(() => {
        const err = null;
        const collection = null;
        return [err, collection];
      }),
    };
    const err = await createCollectionRecord(
      mockCollectionRecord,
      mockUserId,
      db
    );
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(collection).*(doesn't exist).*/gi),
    });
  });

  it("should save the collection record in database", async () => {
    const db = {
      ...mockDB,
      saveCollectionRecord: jest.fn(() => {
        const err = null;
        return err;
      }),
    };
    await createCollectionRecord(mockCollectionRecord, mockUserId, db);
    expect(db.saveCollectionRecord.mock.calls.length).toBe(1);
  });

  it("should increment wallpaper count in collection", async () => {
    const db = {
      ...mockDB,
      incrementCollectionWallpaperCount: jest.fn(() => {
        const err = null;
        return err;
      }),
    };
    await createCollectionRecord(mockCollectionRecord, mockUserId, db);
    expect(db.incrementCollectionWallpaperCount.mock.calls.length).toBe(1);
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await createCollectionRecord(
      mockCollectionRecord,
      mockUserId,
      mockDB
    );
    expect(err).toBeNull();
  });
});
