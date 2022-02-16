const bcrypt = require("bcrypt");
const deleteUser = require("../../users/deleteUser");

const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("My_pass123", salt);
const mockUser = { password: passwordHash };

const mockConfirmationPassword = "My_pass123";

const mockDB = {
    deleteUser: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create user", () => {
    it("should return error with status 400 if confirmationPassword doesn't exist", async () => {
        const err = await deleteUser();
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(required).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmationPassword is not a string", async () => {
        const confirmationPassword = 1;
        const err = await deleteUser(confirmationPassword);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(string).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmationPassword is less than 8 characters long", async () => {
        const confirmationPassword = "abcdefg";
        const err = await deleteUser(confirmationPassword);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(8 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmationPassword is greater than 32 characters long", async () => {
        const confirmationPassword = "a".repeat(33);
        const err = await deleteUser(confirmationPassword);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error status 400 if confirmationPassword is wrong", async () => {
        const confirmationPassword = "some_password";
        const err = await deleteUser(confirmationPassword, mockUser);
        expect(err).toMatchObject({
            status: 400,
            message: "wrong password!",
        });
    });

    it("should delete the user from database", async () => {
        await deleteUser(mockConfirmationPassword, mockUser, mockDB);
        expect(mockDB.deleteUser.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await deleteUser(
            mockConfirmationPassword,
            mockUser,
            mockDB
        );
        expect(err).toBeNull();
    });
});
