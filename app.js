const path = require("path");
const express = require("express");
const session = require("express-session");
const { passportConfig } = require("./config/passport");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes/_index");

function makeApp(database) {
  const app = express();

  // Session configuration (single instance)
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      // Add this for production:
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  );

  passportConfig(app, database);
  app.use(express.json());

  // Database context
  app.use((req, res, next) => {
    req.database = database;
    next();
  });

  // API routes
  app.use("/api", routes);

  // Static files handling
  if (process.env.NODE_ENV === "production") {
    // Serve React build files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle client-side routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  } else {
    // Development static files (public folder)
    app.use(express.static(path.join(__dirname, "public")));
  }

  app.use(errorHandler);

  return app;
}

module.exports = makeApp;
