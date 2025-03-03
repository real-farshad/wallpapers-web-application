const { ObjectId } = require("mongodb");
const deleteCategory = require("../../categories/deleteCategory");

const mockId = String(new ObjectId());
const mockDB = {
  findAndDeleteCategory: jest.fn(() => {
    const err = null;
    const success = true;
    return [err, success];
  }),
};

describe("delete category", () => {
  it("should return error with status 400 if category id is not a valid id", async () => {
    const invalidId = "123456789";
    const err = await deleteCategory(invalidId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid categoryId!",
    });
  });

  it("should return error with status 404 if a category with related id doesn't exist", async () => {
    const db = {
      findAndDeleteCategory: jest.fn(() => {
        const err = null;
        const success = false;
        return [err, success];
      }),
    };
    const err = await deleteCategory(mockId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(category).*(doesn't exist).*/gi),
    });
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await deleteCategory(mockId, mockDB);
    expect(err).toBeNull();
  });
});
