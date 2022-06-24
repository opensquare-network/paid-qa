require("dotenv").config();
const { scan } = require("./scan");
const {
  chain: { subscribeChainHeight, updateSpecs },
} = require("@osn/scan-common");

async function main() {
  await subscribeChainHeight();
  await updateSpecs();

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
