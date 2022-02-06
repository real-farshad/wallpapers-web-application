const express = require("express");
const routes = require("./routes");

function makeApp(database) {
    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        req.database = database;
        next();
    });

    app.use("/api", routes);

    return app;
}

module.exports = makeApp;
