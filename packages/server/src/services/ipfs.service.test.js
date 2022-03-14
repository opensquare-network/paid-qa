const { ipfsAdd } = require("./ipfs.service");

jest.setTimeout(10 * 1000);

describe("Ipfs Test", () => {
  test("ipfsAdd", async () => {
    const added = await ipfsAdd({
      title: "This is the title",
      content: "This is the content",
      language: "en",
    });

    expect(added?.cid?.toV1().toString()).toEqual(
      "bafybeidnbaxbd4wvj57nby5vx2d3wwjgcfd2bkbydmqa3p2yw4jcesfwku"
    );
  });
});
