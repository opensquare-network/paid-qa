const { postAnswer, getAnswers } = require("../../answer");

jest.mock("../../node.service");
jest.mock("../../ipfs.service");
jest.mock("../../../utils/signature");

module.exports = () => {
  test("Post answer", async () => {
    const data = {
      answer: {
        topic: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        content: "This is the answer content",
      },
      address: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
      network: "statemine",
      signature:
        "0x2670b1d48c34c0f2ea011ca9a4ffc0d67e7e6feae3d9b27e98f3f37cddd6ea2d8be7f7709d835b556e6775b05ceeb030625566d4f4bebcad3a7b20685caeca80",
    };
    const { cid } = await postAnswer(data);

    expect(cid).toBe(
      "bafybeid7rubeeu4vyrivdgkpiwgyruvybcriwth7pjn5k5syznpgzegavy"
    );
  });

  test("Get answer", async () => {
    const topicCid =
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku";
    const result = await getAnswers(topicCid, 1, 10);
    expect(result).toMatchObject({
      items: [
        {
          cid: "bafybeid7rubeeu4vyrivdgkpiwgyruvybcriwth7pjn5k5syznpgzegavy",
          content: "This is the answer content",
          data: {
            address: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
            answer: {
              content: "This is the answer content",
              topic:
                "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
            },
            network: "statemine",
            signature:
              "0x2670b1d48c34c0f2ea011ca9a4ffc0d67e7e6feae3d9b27e98f3f37cddd6ea2d8be7f7709d835b556e6775b05ceeb030625566d4f4bebcad3a7b20685caeca80",
          },
          funds: [],
          network: "statemine",
          pinned: false,
          signature:
            "0x2670b1d48c34c0f2ea011ca9a4ffc0d67e7e6feae3d9b27e98f3f37cddd6ea2d8be7f7709d835b556e6775b05ceeb030625566d4f4bebcad3a7b20685caeca80",
          signer: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
          signerPublicKey:
            "005ecd4a9d270cf26b7b5cd1656a91684df6c0d0c1586dbdd3110ca45cc90a5e",
          status: "reserved",
          topicCid:
            "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        },
      ],
      page: 1,
      pageSize: 10,
      total: 1,
    });
  });
};
