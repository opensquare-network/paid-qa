const mongoose = require("mongoose");
const { toDecimal128 } = require("../utils/db");
const { createTopic } = require("./topic.service");

describe("Topic Test", () => {
  afterAll(async () => {
    mongoose.connection.close();
  });

  test("createTopic", async () => {
    const result = await createTopic(
      "title",
      "content",
      "en",
      "statemine",
      "asset",
      8,
      "RMRK",
      toDecimal128("0x123"),
      {
        data: "data",
      },
      "E8VvppvCnuHUEeKktkD81dRHkpUnwAEj8cq5WFRZagcAGsy",
      "signature",
    );

    expect(result).toMatchObject({
      cid: "QmPp1wx9JaeCdHfNUqsFRQ1DeM2XpAqif4XagXEXM6PaiR"
    })
  });
});
