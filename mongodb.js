const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "edureka_intern";

dbConnect = async () => {
  const result = await client.connect();
  console.log("Connected to the server successfully");
  return result.db(dbName);
};

module.exports = dbConnect;
