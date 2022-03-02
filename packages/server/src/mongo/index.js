const { connectDb } = require("./db");

let db = null;

async function createIndex(db) {
}

async function initDb() {
  if (!db) {
    db = await connectDb(
      process.env.MONGO_DB_NAME || "paid-qa"
    );
    await createIndex(db);
  }
}

async function getDb() {
  if (!db) {
    await initDb();
  }
  return db;
}

async function getCollection(colName) {
  const db = await getDb();
  return db.getCollection(colName);
}

module.exports = {
  initDb,
  getDb,
  getQuestionCollection: () => getCollection("question"),
  getAnswerCollection: () => getCollection("answer"),
  getPromiseCollection: () => getCollection("promise"),
  getFundCollection: () => getCollection("fund"),
  getActivityCollection: () => getCollection("activity"),
  getNotificationCollection: () => getCollection("notification"),
};
