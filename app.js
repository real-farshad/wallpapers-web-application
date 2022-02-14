const express = require("express");
const { passportConfig } = require("./configs/passport");
const errorHandler = require("./middleware/errorHandler");

const routes = require("./routes/_index");

function makeApp(database) {
    const app = express();

    passportConfig(app, database);

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
