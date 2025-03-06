require("dotenv").config();
const makeApp = require("./app");
const { connectToDb } = require("./config/mongodb");
const database = require("./database/_index");

async function runServer() {
  const err = await connectToDb();
  if (err) return console.log("Unable to connected to mongodb!");
  console.log("connected to mongodb...");

  const app = makeApp(database);

  const port = process.env.PORT || "5000";
  app.listen(port, () => {
    const env = process.env.NODE_ENV;
    console.log(`[${env.toUpperCase()}] - listening on port ${port}...`);
  });
}

runServer();
