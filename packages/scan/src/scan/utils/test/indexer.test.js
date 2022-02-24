const { getBlockIndexer } = require("../indexer");
const { setupPolkadotApi, disconnect, } = require("../../../common/test/utils");
const { fetchOneBlock } = require("../../fetch");
jest.setTimeout(30000);

describe("Block", () => {
  beforeAll(async () => {
    await setupPolkadotApi();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("indexer works", async () => {
    const height = 9147137;
    const result = await fetchOneBlock(height);

    const indexer = getBlockIndexer(result.block)
    expect(indexer).toEqual({
      "blockHeight": 9147137,
      "blockHash": "0x573777671446d7c0b4a1ba7bca57eb6775626e29c69bf7a7b4b21e9ddfd5675f",
      "blockTime": 1645589220005
    })
  })
})
