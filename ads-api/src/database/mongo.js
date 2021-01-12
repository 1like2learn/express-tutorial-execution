const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let database = null;

// Creates a database 
async function startDatabase() {
    const mongo = new MongoMemoryServer(); // This is the server created in memory
    const mongoDBURL = await mongo.getUri(); // This is the location of that server
    // This connects the server in memory to MongoDB
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true, useUnifiedTopology: true});
    database = connection.db();
}

// Creates a database if one does not already exist
async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
};