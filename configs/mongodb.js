const { MongoClient } = require("mongodb");

let client;

async function connectToDb() {
    const { MONGODB_URI } = process.env;
    client = new MongoClient(MONGODB_URI);
    await client.connect();
}

function database() {
    if (!client) connectToDb();

    const { MONGODB_DB } = process.env;
    return client.db(MONGODB_DB);
}

module.exports = {
    database,
    connectToDb,
};
