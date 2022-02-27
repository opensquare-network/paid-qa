const { setupPolkadotApi, disconnect, } = require("../../common/test/utils");
const { fetchOneBlock } = require("../fetch");
jest.setTimeout(300000);

describe("Fetch", () => {
  beforeAll(async () => {
    await setupPolkadotApi();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("one block works", async () => {
    const height = 9147137;
    const result = await fetchOneBlock(height);
    expect(result.height).toEqual(height);
    expect(result.block.extrinsics.length).toEqual(4);
    expect(result.events.length).toEqual(18);
    expect(result.block.extrinsics[3].method.method).toEqual("transferKeepAlive");
  })
})
