const { ipfsAdd } = require("./ipfs.service");

jest.setTimeout(10 * 1000);

describe("Ipfs Test", () => {
  test("ipfsAdd", async () => {
    const added = await ipfsAdd({
      title: "This is the title",
      content: "This is the content",
      language: "en",
    });

    expect(added?.cid?.toV0().toString()).toEqual(
      "QmVgGPAeCX5cDNG7RGkmaWkfF7ZMYYnVA2m4G18jwEFxkU"
    );
  });
});
