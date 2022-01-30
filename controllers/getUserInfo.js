async function getUserInfo(req, res) {
    const user = {
        username: req.user.username,
        avatar: req.user.avatar || null,
        local: req.user.local,
    };

    return res.json(user);
}

module.exports = getUserInfo;
