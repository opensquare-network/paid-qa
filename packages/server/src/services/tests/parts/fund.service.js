const { getAnswers } = require("../../answer.service");
const { addFund } = require("../../fund.service");

jest.mock("../../node.service");
jest.mock("../../ipfs.service");
jest.mock("../../../utils/signature");

module.exports = () => {
  test("Fund the answer", async () => {
    const result = await addFund(
      "statemine",
      "0x0000000000000000000000000000000000000000000000000000000000000003",
      1
    );

    expect(result).toMatchObject({
      beneficiary: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
      decimals: 12,
      symbol: "KSM",
      value: "0.000000000001",
    });
  });

  test("Fund should be found for the answer", async () => {
    const topicCid =
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku";
    const result = await getAnswers(topicCid, 1, 10);
    expect(result).toMatchObject({
      items: [
        {
          funds: [
            {
              beneficiary: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
              beneficiaryPublicKey:
                "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
              blockTime: 1648444080001,
              currencyType: "native",
              decimals: 12,
              ipfsCid:
                "bafybeid7rubeeu4vyrivdgkpiwgyruvybcriwth7pjn5k5syznpgzegavy",
              network: "statemine",
              sponsor: "5C7RcsPnPLZNjdZFqPxSMTRVMiHLNafgTUN5h51nGQD8yGa1",
              sponsorPublicKey:
                "021313138fa11ed4217d3443c335176c6ab231bdbb2c61c10751cccc1dfc407c",
              symbol: "KSM",
              value: "1E-12",
            },
          ],
        },
      ],
      page: 1,
      pageSize: 10,
      total: 1,
    });
  });
};
