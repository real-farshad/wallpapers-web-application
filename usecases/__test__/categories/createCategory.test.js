const createCategory = require("../../categories/createCategory");

const mockCategory = { title: "new category title" };
const mockDB = {
    findCategoryByTitle: jest.fn(() => {
        const err = null;
        const category = null;
        return [err, category];
    }),
    saveCategory: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create category", () => {
    it("should return error with status 400 if there is no title", async () => {
        const category = {};
        const err = await createCategory(category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(required).*/gi),
        });
    });

    it("should return error with status 400 if the title is not a string", async () => {
        const category = { title: 1 };
        const err = await createCategory(category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(title).*(string).*/gi),
        });
    });

    it("should return error with status 400 if the title is less than 3 characters", async () => {
        const category = { title: "ab" };
        const err = await createCategory(category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if the title is more than 32 characters", async () => {
        const longString = "a".repeat(33);
        const category = { title: longString };
        const err = await createCategory(category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(title).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if category has any extra properties", async () => {
        const category = { ...mockCategory, extraProperty: "extra property" };
        const err = await createCategory(category);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error with status 400 if a category with same title exists", async () => {
        const db = {
            findCategoryByTitle: jest.fn(() => {
                const err = null;
                const category = { title: "same category title" };
                return [err, category];
            }),
        };
        const err = await createCategory(mockCategory, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(category).*(title).*(exists).*/gi
            ),
        });
    });

    it("should save category in database", async () => {
        await createCategory(mockCategory, mockDB);
        expect(mockDB.saveCategory.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createCategory(mockCategory, mockDB);
        expect(err).toBeNull();
    });
});
