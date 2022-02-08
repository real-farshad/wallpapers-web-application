const express = require("express");
const routes = require("./routes/_index");
const errorHandler = require("./middleware/errorHandler");

function makeApp(database) {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        req.database = database;
        next();
    });

    app.use("/api", routes);

    app.use(errorHandler);

    return app;
}

module.exports = makeApp;
