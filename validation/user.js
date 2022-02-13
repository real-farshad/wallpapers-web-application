const Joi = require("joi");

const passwordPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;

const userSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(3).max(96).required(),
    email: Joi.string()
        .trim()
        .min(3)
        .max(128)
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: Joi.string().min(8).max(32).pattern(passwordPattern).required(),
});

async function validateUser(user) {
    let error;
    let validUser;

    try {
        validUser = await userSchema.validateAsync(user);
        error = null;
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
        validUser = null;
    }

    return [error, validUser];
}

module.exports = validateUser;
