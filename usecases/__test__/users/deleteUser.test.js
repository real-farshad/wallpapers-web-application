const bcrypt = require("bcrypt");
const deleteUser = require("../../users/deleteUser");

const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("My_pass123", salt);
const mockUser = { password: passwordHash };

const mockPassword = "My_pass123";

const mockDB = {
    deleteUser: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create user", () => {
    it("should return error with status 400 if password doesn't exist", async () => {
        const err = await deleteUser();
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(password).*(required).*/gi),
        });
    });

    it("should return error with status 400 if password is not a string", async () => {
        const password = 1;
        const err = await deleteUser(mockUser, password);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(password).*(string).*/gi),
        });
    });

    it("should return error with status 400 if password is less than 8 characters long", async () => {
        const password = "abcdefg";
        const err = await deleteUser(mockUser, password);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(8 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if password is greater than 32 characters long", async () => {
        const password = "a".repeat(33);
        const err = await deleteUser(mockUser, password);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error status 400 if password doesn't match user's hashed password", async () => {
        const password = "some_password";
        const err = await deleteUser(mockUser, password);
        expect(err).toMatchObject({
            status: 400,
            message: "wrong password!",
        });
    });

    it("should delete the user from database", async () => {
        await deleteUser(mockUser, mockPassword, mockDB);
        expect(mockDB.deleteUser.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteUser(mockUser, mockPassword, mockDB);
        expect(err).toBeNull();
    });
});
