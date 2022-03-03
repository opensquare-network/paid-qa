require("dotenv").config();
const { initDb, closeDb, } = require("./mongo");
const { subscribeFinalizedHeight } = require("./chain/finalized");
const { scan } = require("./scan")

async function main() {
  await initDb();
  await subscribeFinalizedHeight();

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error)
  .finally(async () => {
    await closeDb();
  });
