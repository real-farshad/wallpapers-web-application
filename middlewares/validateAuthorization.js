async function validateAuthorization(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            error: "unauthorized!",
        });
    }

    next();
}

module.exports = validateAuthorization;
