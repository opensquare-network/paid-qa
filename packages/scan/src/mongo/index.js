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
let topicCol = null;
let appendixCol = null;
let answerCol = null;

let client = null;
let db = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl);

  const dbName = getDbName();
  console.log(`QA scan DB name:`, dbName);
  db = client.db(dbName);

  statusCol = await getCollection(db, statusCollectionName);
  topicCol = await getCollection(db, "topic");
  appendixCol = await getCollection(db, "appendix");
  answerCol = await getCollection(db, "answer");
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

async function getTopicCollection() {
  await tryInit(topicCol);
  return topicCol;
}

async function getAppendixCollection() {
  await tryInit(appendixCol);
  return appendixCol;
}

async function getAnswerCollection() {
  await tryInit(answerCol);
  return answerCol;
}

async function closeDb() {
  if (client) {
    await client.close();
  }
}

module.exports = {
  initDb,
  closeDb,
  getAppendixCollection,
  getStatusCollection,
  getTopicCollection,
  getAnswerCollection,
};
