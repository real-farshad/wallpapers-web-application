const path = require("path");
const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { connectToDb } = require("./configs/mongodb");

// wrap routes in try catch block
require("express-async-errors");

// dotenv config
require("dotenv").config();

const app = express();

// parse incoming request bodies
app.use(express.json());

// serve static files
app.use(express.static(path.resolve(__dirname, "./public")));

// routes
app.use("/api", routes);

// connect the react app
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});

// default error handler
app.use(errorHandler);

// connect to mongodb
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

try {
    connectToDb(uri, dbName);
} catch (err) {
    console.log("unable to connect to mongodb!", err);
}

// listen for requests
const port = process.env.PORT || "5000";
app.listen(port, () => {
    const env = process.env.NODE_ENV;
    return console.log(`[${env.toUpperCase()}] - listening on port ${port}...`);
});
