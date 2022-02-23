const { extractExtrinsicEvents, isExtrinsicSuccess } = require("../extrinsics");
const { setupPolkadotApi, disconnect, } = require("../../../common/test/utils");
const { fetchOneBlock } = require("../../fetch");
jest.setTimeout(30000);

describe("Extrinsic", () => {
  beforeAll(async () => {
    await setupPolkadotApi();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("extractExtrinsicEvents works", async () => {
    const height = 9147137;
    const { events } = await fetchOneBlock(height);

    const extrinsicEvents = extractExtrinsicEvents(events, 3);
    expect(extrinsicEvents.length).toEqual(8);
    expect(isExtrinsicSuccess(extrinsicEvents)).toBeTruthy()
  })
})
