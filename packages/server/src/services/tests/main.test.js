const mongoose = require("mongoose");

describe("Ipfs Test", require("./parts/ipfs.service"));
describe("Topic Test", require("./parts/topic.service"));
describe("Answer Test", require("./parts/answer.service"));
describe("Support Test", require("./parts/support.service"));
describe("Fund Test", require("./parts/fund.service"));
describe("Resolve Test", require("./parts/resolve.service"));

afterAll(async () => {
  await mongoose.disconnect();
});
