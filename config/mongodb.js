const { MongoClient } = require("mongodb");

let client;

async function connectToDb() {
    try {
        const { MONGODB_URI } = process.env;
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        return null;
    } catch (err) {
        return err;
    }
}

function getDatabase() {
    if (!client) connectToDb();

    const { MONGODB_DB } = process.env;
    return client.db(MONGODB_DB);
}

module.exports = {
    getDatabase,
    connectToDb,
};
