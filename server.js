require("dotenv").config();
const makeApp = require("./app");
const { connectToDb } = require("./config/mongodb");
const database = require("./database/_index");

async function runServer() {
  const err = await connectToDb();
  if (err) return console.log("Unable to connect to MongoDB!");
  console.log("Connected to MongoDB...");

  const app = makeApp(database);

  // Vercel-specific handling
  if (process.env.NODE_ENV === "production") {
    // Export for Vercel serverless functions
    module.exports = app;
  } else {
    // Local development
    const port = process.env.PORT || "5000";
    app.listen(port, () => {
      const env = process.env.NODE_ENV || "development";
      console.log(`[${env.toUpperCase()}] - Listening on port ${port}...`);
    });
  }
}

runServer();
