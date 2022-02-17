const { ObjectId } = require("mongodb");
const updateCategory = require("../../categories/updateCategory");

const mockId = String(new ObjectId());
const mockCategory = { title: "updated category title" };
const mockDB = {
    findCategoryById: jest.fn(() => {
        const err = null;
        const category = { title: "category title" };
        return [err, category];
    }),
    findCategoryByTitle: jest.fn(() => {
        const err = null;
        const category = null;
        return [err, category];
    }),
    updateCategory: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("update category", () => {
    it("should return error with status 400 if category id is not a valid id", async () => {
        const invalidCategoryId = "123456789";
        const err = await updateCategory(invalidCategoryId);
        expect(err).toMatchObject({
            status: 400,
            message: "invalid category id!",
        });
    });

    it("should return error with status 400 if request body doesn't have category title in it", async () => {
        const category = {};
        const err = await updateCategory(mockId, category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(required).*/gi),
        });
    });

    it("should return error with status 400 if category title is not a string", async () => {
        const category = { title: 1 };
        const err = await updateCategory(mockId, category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if category title is less than 3 characters", async () => {
        const category = { title: "ab" };
        const err = await updateCategory(mockId, category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category title is more than 32 characters", async () => {
        const longString = "a".repeat(33);
        const category = { title: longString };
        const err = await updateCategory(mockId, category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category has any extra properties", async () => {
        const category = { ...mockCategory, extraProperty: "extra property" };
        const err = await updateCategory(mockId, category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 404 if there is no category with related id", async () => {
        const db = {
            findCategoryById: jest.fn(() => {
                const err = null;
                const category = null;
                return [err, category];
            }),
        };
        const err = await updateCategory(mockId, mockCategory, db);
        expect(err).toMatchObject({
            status: 404,
            message: expect.stringMatching(/.*(category).*(doesn't exist).*/gi),
        });
    });

    it("should return error with status 400 if category title is the same", async () => {
        const db = {
            findCategoryById: jest.fn(() => {
                const err = null;
                return [err, mockCategory];
            }),
        };
        const err = await updateCategory(mockId, mockCategory, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(category).*(no).*(change).*/gi),
        });
    });

    it("should return error with status 400 if new category title is not unique", async () => {
        const db = {
            findCategoryById: mockDB.findCategoryById,
            findCategoryByTitle: jest.fn(() => {
                const err = null;
                const category = { title: "same category" };
                return [err, category];
            }),
        };
        const err = await updateCategory(mockId, mockCategory, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(category).*(exists).*/gi),
        });
    });

    it("should update the category in database", async () => {
        const err = await updateCategory(mockId, mockCategory, mockDB);
        expect(mockDB.updateCategory.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await updateCategory(mockId, mockCategory, mockDB);
        expect(err).toBeNull();
    });
});
