async function checkUniqueEmail(email, database) {
    try {
        const userWithSameEmail = await database.findUserByEmail(email);
        if (userWithSameEmail) {
            const knownError = {
                known: true,
                status: 403,
                message: "an user with this email address already exists!",
            };

            return knownError;
        }

        return null;
    } catch (err) {
        return err;
    }
}

module.exports = checkUniqueEmail;
