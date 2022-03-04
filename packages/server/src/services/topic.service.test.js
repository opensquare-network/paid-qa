const mongoose = require("mongoose");
const { toDecimal128 } = require("../utils/db");
const { createTopic, setTopicPublished, getTopic, deleteTopic } = require("./topic.service");

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

  test("setTopicPublished", async () => {
    const result = await setTopicPublished("QmPp1wx9JaeCdHfNUqsFRQ1DeM2XpAqif4XagXEXM6PaiR");

    expect(result).toEqual(true);
  });

  test("getTopic", async () => {
    const result = await getTopic("QmPp1wx9JaeCdHfNUqsFRQ1DeM2XpAqif4XagXEXM6PaiR");

    expect(result).toMatchObject({ status: "published" });
  });

  test("deleteTopic", async () => {
    await deleteTopic("QmPp1wx9JaeCdHfNUqsFRQ1DeM2XpAqif4XagXEXM6PaiR");

    const result = await getTopic("QmPp1wx9JaeCdHfNUqsFRQ1DeM2XpAqif4XagXEXM6PaiR");
    expect(result).toBeNull();
  });
});
