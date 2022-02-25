const path = require("path");
const express = require("express");
const session = require("express-session");
const { passportConfig } = require("./config/passport");
const errorHandler = require("./middleware/errorHandler");

const routes = require("./routes/_index");

function makeApp(database) {
    const app = express();

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        })
    );

    passportConfig(app, database);

    app.use(express.json());

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
        })
    );

    app.use(express.static(path.resolve(__dirname, "./public")));

    app.use((req, res, next) => {
        req.database = database;
        next();
    });

    app.use("/api", routes);
    app.use(errorHandler);

    return app;
}

module.exports = makeApp;
