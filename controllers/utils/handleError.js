function handleError(err, res, next) {
    if (err.known) {
        return res.status(err.status).json({ error: err.message });
    } else {
        return next(err);
    }
}

module.exports = handleError;
