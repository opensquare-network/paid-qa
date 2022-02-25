const { queryAssetInfo } = require("../tokenInfo");
const { getApi } = require("../../../../chain/api");
const { queryNativeTokenInfo } = require("../tokenInfo");
const {
  setupPolkadotApi,
  setupKusamaApi,
  setupStatemineApi,
  disconnect,
} = require("../../../../common/test/utils");
jest.setTimeout(300000);

describe("Query token info", () => {
  test(".polkadot native works", async () => {
    await setupPolkadotApi();
    const token = await queryNativeTokenInfo();
    expect(token.symbol).toBe("DOT");
    expect(token.decimals).toEqual(10);
    await disconnect();
  });

  test(".kusama native works", async () => {
    await setupKusamaApi();
    const token = await queryNativeTokenInfo();
    expect(token.symbol).toBe("KSM");
    expect(token.decimals).toEqual(12);
    await disconnect();
  });

  test(".statemine native works", async () => {
    await setupStatemineApi();
    const token = await queryNativeTokenInfo();
    expect(token.symbol).toBe("KSM");
    expect(token.decimals).toEqual(12);
    await disconnect();
  });

  test(".statemine asset#8 works", async () => {
    await setupStatemineApi();

    const height = 1757976;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);
    const token = await queryAssetInfo(8, blockHash);
    expect(token.symbol).toBe("RMRK");
    expect(token.decimals).toEqual(10);

    await disconnect();
  })
})
