require("dotenv").config();
const { subscribeFinalizedHeight } = require("./chain/finalized");
const { scan } = require("./scan");

async function main() {
  await subscribeFinalizedHeight();

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
