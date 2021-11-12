const { MongoClient } = require("mongodb");

const mongo = {};

async function connectToDb(uri, dbName) {
    mongo.client = new MongoClient(uri);
    await mongo.client.connect();
    mongo.db = mongo.client.db(dbName);

    console.log("Connected to mongodb...");
}

module.exports = {
    mongo,
    connectToDb,
};
