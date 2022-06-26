require("dotenv").config();

const { scan } = require("./scan");
const {
  chain: { subscribeChainHeight },
} = require("@osn/scan-common");

async function main() {
  await subscribeChainHeight();

  await scan();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
