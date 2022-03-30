const { cidOf } = require("../../ipfs.service");

jest.setTimeout(10 * 1000);

module.exports = () => {
  test("cidOf", async () => {
    const cid = await cidOf({
      title: "This is the title",
      content: "This is the content",
      language: "en",
    });

    expect(cid).toBe(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
  });

  test("cidOf", async () => {
    const cid = await cidOf({
      topic: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
      content: "This is the appendant content",
    });

    expect(cid).toBe(
      "bafybeifbp4mtplen3aov5jw52ftv6pigxmniq5yivjh4zaxbuoy6p6fyay"
    );
  });

  test("cidOf", async () => {
    const cid = await cidOf({
      answer: {
        topic: "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku",
        content: "This is the answer content",
      },
      address: "5C5C24tLgXg973FRixpzTYTJq9r443LVwjceDvnVErdXgNfn",
      network: "statemine",
      signature:
        "0x2670b1d48c34c0f2ea011ca9a4ffc0d67e7e6feae3d9b27e98f3f37cddd6ea2d8be7f7709d835b556e6775b05ceeb030625566d4f4bebcad3a7b20685caeca80",
    });

    expect(cid).toBe(
      "bafybeid7rubeeu4vyrivdgkpiwgyruvybcriwth7pjn5k5syznpgzegavy"
    );
  });
};
