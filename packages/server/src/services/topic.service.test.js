const mongoose = require("mongoose");
const { toDecimal128 } = require("../utils/db");
const { createTopic, getTopic } = require("./topic.service");

describe("Topic Test", () => {
  afterAll(async () => {
    mongoose.connection.close();
  });

  test("createTopic", async () => {

  });

  test("getTopic", async () => {});
});
