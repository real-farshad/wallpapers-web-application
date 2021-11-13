const path = require("path");
const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const { connectToDb } = require("./configs/mongodb");

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
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.get("*", (req, res) => {
//     return res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
// });

// default error handler
app.use(errorHandler);

// connect to mongodb
connectToDb()
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.log("Unable to connect to mongodb!"));

// listen for requests
const port = process.env.PORT || "5000";
app.listen(port, () => {
    const env = process.env.NODE_ENV;
    return console.log(`[${env.toUpperCase()}] - listening on port ${port}...`);
});
