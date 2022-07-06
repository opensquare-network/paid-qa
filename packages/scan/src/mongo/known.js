const { MongoClient } = require("mongodb");

function getDbName() {
  return process.env.MONGO_DB_KNOWN_HEIGHTS_NAME || "known-heights";
}

const heightCollectionName = "height";

let client = null;
let db = null;

const mongoUrl =
  process.env.MONGO_DB_KNOWN_HEIGHTS_URL || "mongodb://localhost:27017";

let heightCol = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  db = client.db(getDbName());
  heightCol = db.collection(heightCollectionName);

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await heightCol.createIndex({ height: 1 }, { unique: true });
}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getHeightCollection() {
  await tryInit(heightCol);
  return heightCol;
}

async function closeKnownClient() {
  await client.close();
}

async function saveKnownHeights(heights = []) {
  if (heights.length <= 0) {
    return;
  }

  const col = await getHeightCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const height of heights) {
    bulk.find({ height }).upsert().updateOne({ $set: { height } });
  }

  await bulk.execute();
}

module.exports = {
  getHeightCollection,
  closeKnownClient,
  saveKnownHeights,
};
