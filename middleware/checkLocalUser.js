function checkLocalUser(req, res, next) {
    if (!req.user.local) {
        return res.status(400).json({
            message: "not a local user!",
        });
    } else next();
}

module.exports = checkLocalUser;
