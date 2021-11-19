const { MongoClient } = require("mongodb");

let client;

async function connectToDb() {
    // if already connected, return
    if (client) return;

    // otherwise connect to the database
    const { MONGODB_URI } = process.env;
    client = new MongoClient(MONGODB_URI);
    await client.connect();
}

function getDatabase() {
    connectToDb();

    const { MONGODB_DB } = process.env;
    return client.db(MONGODB_DB);
}

module.exports = {
    getDatabase,
    connectToDb,
};
