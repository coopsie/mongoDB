require('dotenv').config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function connect() {
    try {
        await client.connect();
        const db = client.db("m44MongoCLI");
        return db.collection("Movie");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {client, connect};