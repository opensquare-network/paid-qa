const { createTopic, getTopic, addAppendant } = require("../../topic.service");

jest.mock("../../node.service");
jest.mock("../../ipfs.service");

module.exports = () => {
  test("Create new topic", async () => {
    const { cid } = await createTopic(
      {
        title: "This is the title",
        content: "This is the content",
        language: "en",
      },
      "statemine",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      1
    );

    expect(cid).toBe(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
  });

  test("Add appendant", async () => {
    const { cid } = await addAppendant(
      {
        topic: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        content: "This is the appendant content",
      },
      "statemine",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
      1
    );
  });

  test("Topic content should be right", async () => {
    const topic = await getTopic(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
    expect(topic?.toJSON()).toMatchObject({
      appendants: [
        {
          blockTime: 1648444080001,
          cid: "bafybeifbp4mtplen3aov5jw52ftv6pigxmniq5yivjh4zaxbuoy6p6fyay",
          content: "This is the appendant content",
          data: {
            content: "This is the appendant content",
            topic:
              "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
          },
          network: "statemine",
          pinned: true,
          signer: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          status: "published",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        },
      ],
      blockTime: 1648444080001,
      cid: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
      content: "This is the content",
      data: {
        content: "This is the content",
        language: "en",
        title: "This is the title",
      },
      funds: [],
      language: "en",
      network: "statemine",
      pinned: true,
      resolves: [],
      rewards: [
        {
          blockTime: 1648444080001,
          currencyType: "native",
          decimals: 12,
          network: "statemine",
          sponsor: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          sponsorPublicKey:
            "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
          symbol: "KSM",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
          value: "1",
        },
      ],
      signer: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
      signerPublicKey:
        "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
      status: "published",
      title: "This is the title",
    });
  });
};
