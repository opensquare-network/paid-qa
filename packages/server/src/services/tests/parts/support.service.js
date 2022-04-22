const { addSupport } = require("../../support.service");
const { getTopic } = require("../../topic.service");

jest.mock("../../node.service");
jest.mock("../../ipfs.service");

module.exports = () => {
  test("Add support to topic", async () => {
    const result = await addSupport(
      "statemine",
      "0x0000000000000000000000000000000000000000000000000000000000000002",
      1
    );

    expect(result).toMatchObject({
      decimals: 12,
      symbol: "KSM",
      topicCid: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
      value: "10",
    });
  });

  test("Support should be saved", async () => {
    const topic = await getTopic(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
    expect(topic?.toJSON()).toMatchObject({
      rewards: [
        {
          indexer: {
            blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            blockHeight: 0,
            extrinsicIndex: 1,
            blockTime: 1648444080001,
          },
          bounty: {
            tokenIdentifier: "N",
            symbol: "KSM",
            decimals: 12,
            value: "1",
          },
          network: "statemine",
          sponsor: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          sponsorPublicKey:
            "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        },
        {
          indexer: {
            blockHash: "0x0000000000000000000000000000000000000000000000000000000000000002",
            blockHeight: 2,
            extrinsicIndex: 1,
            blockTime: 1648444080001,
          },
          bounty: {
            tokenIdentifier: "N",
            symbol: "KSM",
            decimals: 12,
            value: "10",
          },
          network: "statemine",
          sponsor: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          sponsorPublicKey:
            "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        },
      ],
    });
  });
};
