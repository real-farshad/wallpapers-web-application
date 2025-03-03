const { ObjectId } = require("mongodb");
const deleteComment = require("../../comments/deleteComment");

const mockCommentId = String(new ObjectId());
const mockUserId = String(new ObjectId());
const mockDB = {
  findAndDeleteUserComment: jest.fn(() => {
    const err = null;
    const comment = { description: "my comment" };
    return [err, comment];
  }),
};

describe("delete comment", () => {
  it("should return error with status 400 if commentId is not a valid id", async () => {
    const commentId = "1";
    const err = await deleteComment(commentId);
    expect(err).toMatchObject({
      status: 400,
      message: "invalid commentId!",
    });
  });

  it("should return error with status 404 if user comment doesn't exist", async () => {
    const db = {
      findAndDeleteUserComment: jest.fn(() => {
        const err = null;
        const comment = null;
        return [err, comment];
      }),
    };
    const err = await deleteComment(mockCommentId, mockUserId, db);
    expect(err).toMatchObject({
      status: 404,
      message: expect.stringMatching(/.*(comment).*(doesn't exist).*/gi),
    });
  });

  it("should return null as error if the operation was successful", async () => {
    const err = await deleteComment(mockCommentId, mockUserId, mockDB);
    expect(err).toBeNull();
  });
});
