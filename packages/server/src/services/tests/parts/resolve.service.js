const { getTopic } = require("../../topic");
const { resolve } = require("../../resolve");

jest.mock("../../node.service");
jest.mock("../../ipfs.service");

module.exports = () => {
  test("Funder resolve", async () => {
    const result = await resolve(
      "statemine",
      "0x0000000000000000000000000000000000000000000000000000000000000004",
      1
    );

    expect(result).toMatchObject({
      topicCid: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
    });
  });

  test("Topic should be resolved", async () => {
    const topic = await getTopic(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
    expect(topic?.toJSON()).toMatchObject({
      resolves: [
        {
          indexer: {
            blockHash:
              "0x0000000000000000000000000000000000000000000000000000000000000004",
            blockHeight: 4,
            extrinsicIndex: 1,
            blockTime: 1648444080001,
          },
          network: "statemine",
          sponsor: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        },
      ],
      status: "published",
      resolved: true,
    });
  });
};
