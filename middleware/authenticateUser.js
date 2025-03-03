async function authenticateUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: "unauthorized!",
    });
  } else next();
}

module.exports = authenticateUser;
