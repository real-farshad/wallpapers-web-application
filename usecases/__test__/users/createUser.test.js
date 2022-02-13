const createUser = require("../../users/createUser");

const mockUsername = { username: "newUser" };
const mockEmail = { email: "userEmail@gmail.com" };
const mockPassword = { password: "Secure_Password569" };
const mockUser = { ...mockUsername, ...mockEmail, ...mockPassword };
const mockDB = {
    findUserByEmail: jest.fn(() => {
        const err = null;
        const user = null;
        return [err, user];
    }),
    saveUser: jest.fn(() => {
        const err = null;
        return err;
    }),
};

describe("create user", () => {
    it("should return error with status 400 if username doesn't exist", async () => {
        const user = {};
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(username).*(required).*/gi),
        });
    });

    it("should return error with status 400 if username is not a string", async () => {
        const user = { username: 2 };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(username).*(string).*/gi),
        });
    });

    it("should return error with status 400 if username is not alpha-numeric", async () => {
        const user = { username: "user*" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(username).*(alpha-numeric).*/gi),
        });
    });

    it("should return error with status 400 if username is greater than 3 characters long", async () => {
        const user = { username: "ab" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(username).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if username is less than 96 characters long", async () => {
        const longString = "a".repeat(97);
        const user = { username: longString };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(username).*(96 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email doesn't exist", async () => {
        const user = { ...mockUsername };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(email).*(required).*/gi),
        });
    });

    it("should return error with status 400 if email is not a string", async () => {
        const user = { ...mockUsername, email: 2 };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(email).*(string).*/gi),
        });
    });

    it("should return error with status 400 if email is greater than 3 characters long", async () => {
        const user = { ...mockUsername, email: "ab" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(email).*(3 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email is less than 128 characters long", async () => {
        const longString = "a".repeat(129);
        const user = { ...mockUsername, email: longString };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(email).*(128 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if email is not a valid email", async () => {
        const user = { ...mockUsername, email: "myEmail" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(valid).*(email).*/gi),
        });
    });

    it("should return error with status 400 if password doesn't exist", async () => {
        const user = { ...mockUsername, ...mockEmail };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(password).*(required).*/gi),
        });
    });

    it("should return error with status 400 if password is not a string", async () => {
        const user = { ...mockUsername, ...mockEmail, password: 2 };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(password).*(string).*/gi),
        });
    });

    it("should return error with status 400 if password is greater than 8 characters long", async () => {
        const user = { ...mockUsername, ...mockEmail, password: "abcdefg" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(8 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if password is less than 32 characters long", async () => {
        const longString = "a".repeat(33);
        const user = { ...mockUsername, ...mockEmail, password: longString };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(password).*(32 characters long).*/gi
            ),
        });
    });

    it("should return error with status 400 if password is not a scure password", async () => {
        const user = { ...mockUsername, ...mockEmail, password: "mypassword1" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(insecure).*(password).*/gi),
        });
    });

    it("should return error with status 400 if user has any extra property", async () => {
        const user = { ...mockUser, extraProperty: "extra property" };
        const err = await createUser(user);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(
                /.*(extraProperty).*(not).*(allowed).*/gi
            ),
        });
    });

    it("should return erro with status 400 if a user with same email exists", async () => {
        const db = {
            findUserByEmail: jest.fn(() => {
                const err = null;
                const user = { email: "same email" };
                return [err, user];
            }),
        };
        const err = await createUser(mockUser, db);
        expect(err).toMatchObject({
            status: 400,
            message: expect.stringMatching(/.*(user).*(exist).*/gi),
        });
    });

    it("should save user in database", async () => {
        await createUser(mockUser, mockDB);
        expect(mockDB.saveUser.mock.calls.length).toBe(1);
    });

    it("should return null as error if the operation was successfull", async () => {
        const err = await createUser(mockUser, mockDB);
        expect(err).toBeNull();
    });
});
