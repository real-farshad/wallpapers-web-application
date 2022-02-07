function errorHandler(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(403).json({
            error: "invalid json in request body",
        });
    }

    return res.status(500).send("Something went wrong!");
}

module.exports = errorHandler;
