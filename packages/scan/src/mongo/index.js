const { MongoClient } = require("mongodb");
const { getCollection } = require("./getCollection");

function getDbName() {
  const dbName = process.env.MONGO_DB_SCAN_NAME || 'paid-qa';
  if (!dbName) {
    throw new Error("MONGO_DB_SCAN_NAME not set");
  }

  return dbName;
}

const mongoUrl = process.env.MONGO_SCAN_URL || "mongodb://localhost:27017";
const statusCollectionName = "status";
let statusCol = null;
let pendingTopicCol = null;

let client = null;
let db = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl);

  const dbName = getDbName();
  console.log(`QA scan DB name:`, dbName);
  db = client.db(dbName);

  statusCol = await getCollection(db, statusCollectionName);
  pendingTopicCol = await getCollection(db, "pendingTopic");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }
}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getStatusCollection() {
  await tryInit(statusCol);
  return statusCol;
}

async function getPendingTopicCollection() {
  await tryInit(pendingTopicCol);
  return pendingTopicCol;
}

async function closeDb() {
  if (client) {
    await client.close();
  }
}

module.exports = {
  initDb,
  closeDb,
  getStatusCollection,
  getPendingTopicCollection,
};
