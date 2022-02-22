const Joi = require("joi");

const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;

const userUpdateSchema = Joi.object({
    confirmationPassword: Joi.string().min(8).max(32).required(),
    username: Joi.string().trim().alphanum().min(3).max(32),
    email: Joi.string()
        .trim()
        .min(3)
        .max(128)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string().min(8).max(32).pattern(passwordPattern),
});

async function validateUserUpdate(userUpdate) {
    let error, validUserUpdate;

    try {
        validUserUpdate = await userUpdateSchema.validateAsync(userUpdate);

        if (Object.keys(validUserUpdate).length === 1) {
            error = { message: "invalid request!" };
        } else error = null;
    } catch (err) {
        if (err.message.includes("fails to match the required pattern")) {
            const allowed = [
                "lowercase characters",
                "uppercase characters",
                "numbers",
                "special characters",
            ];

            const allowedString =
                allowed.slice(0, 3).join(", ") +
                " and " +
                allowed[allowed.length - 1];

            err.message =
                "insecure password! please use " +
                allowedString +
                " in your password";
        }

        error = err;
        validUserUpdate = null;
    }

    return [error, validUserUpdate];
}

module.exports = validateUserUpdate;
