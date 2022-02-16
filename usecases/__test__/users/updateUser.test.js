const bcrypt = require("bcrypt");
const updateUser = require("../../users/updateUser");

const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync("My_pass123", salt);
const mockUser = { password: passwordHash };

const mockConfirmationPassword = { confirmationPassword: "My_pass123" };
const mockEmail = { email: "userEmail@gmail.com" };
const mockUserUpdate = { ...mockConfirmationPassword, ...mockEmail };

const mockDB = {
    findUserByEmail: jest.fn(() => {
        const err = null;
        const user = null;
        return [err, user];
    }),
    updateUser: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("update user", () => {
    it("should return error with status 400 if confirmation password doesn't exist", async () => {
        const userUpdate = {};
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(required).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmation password is not a string", async () => {
        const userUpdate = { confirmationPassword: 1 };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(string).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmation password is less than 8 characters long", async () => {
        const userUpdate = { confirmationPassword: "abcdefg" };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(8 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if confirmation password is greater than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const userUpdate = { confirmationPassword: longString };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(confirmationPassword).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if user update only contains confirmation password", async () => {
        const err = await updateUser(mockConfirmationPassword);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(invalid).*(request).*/gi),
        });
    });

    it("should return error with status 400 if username exists and is not a string", async () => {
        const userUpdate = { ...mockConfirmationPassword, username: 1 };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(username).*(string).*/gi),
        });
    });

    it("should return error with status 400 if username exists and is not alpha-numeric", async () => {
        const userUpdate = { ...mockConfirmationPassword, username: "user*" };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(username).*(alpha-numeric).*/gi),
        });
    });

    it("should return error with status 400 if username exists and is less than 3 characters long", async () => {
        const userUpdate = { ...mockConfirmationPassword, username: "ab" };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(username).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if username exists and is greater than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const userUpdate = {
            ...mockConfirmationPassword,
            username: longString,
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(username).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email exists and is not a string", async () => {
        const userUpdate = { ...mockConfirmationPassword, email: 1 };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(email).*(string).*/gi),
        });
    });

    it("should return error with status 400 if email exists and is less than 3 characters long", async () => {
        const userUpdate = { ...mockConfirmationPassword, email: "ab" };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(email).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email exists and is greater than 128 characters long", async () => {
        const longString = "a".repeat(129);
        const userUpdate = {
            ...mockConfirmationPassword,
            email: longString,
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(email).*(128 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email exists and is not a valid email", async () => {
        const userUpdate = {
            ...mockConfirmationPassword,
            email: "myEmail",
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(email).*(must be).*(valid).*/gi),
        });
    });

    it("should return error with status 400 if password exists and is not a string", async () => {
        const userUpdate = { ...mockConfirmationPassword, password: 1 };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(password).*(string).*/gi),
        });
    });

    it("should return error with status 400 if password exists and is less than 8 characters long", async () => {
        const userUpdate = { ...mockConfirmationPassword, password: "abcdefg" };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(8 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if password exists and is greater than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const userUpdate = {
            ...mockConfirmationPassword,
            password: longString,
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if password exists and is not a scure password", async () => {
        const userUpdate = {
            ...mockConfirmationPassword,
            password: "mypassword1",
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(insecure).*(password).*/gi),
        });
    });

    it("should return error with status 400 if user update has any extra properties", async () => {
        const userUpdate = {
            ...mockUserUpdate,
            extraProperty: "extra property",
        };
        const err = await updateUser(userUpdate);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return error status 400 if confirmation password is wrong", async () => {
        const userUpdate = {
            ...mockEmail,
            confirmationPassword: "Wron_pass123",
        };
        const err = await updateUser(userUpdate, mockUser);
        expect(err).toMatchObject({
            status: 400,
            message: "wrong confirmation password!",
        });
    });

    it("should return erro with status 400 if email exists but a user it's not unique", async () => {
        const db = {
            findUserByEmail: jest.fn(() => {
                const err = null;
                const user = { email: "same email" };
                return [err, user];
            }),
        };
        const err = await updateUser(mockUserUpdate, mockUser, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(email).*(exist).*/gi),
        });
    });

    it("should update the user in database", async () => {
        await updateUser(mockUserUpdate, mockUser, mockDB);
        expect(mockDB.updateUser.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await updateUser(mockUserUpdate, mockUser, mockDB);
        expect(err).toBeNull();
    });
});
