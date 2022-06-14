const mongoose = require("mongoose");
const { SCAN_MONGODB_URI } = require("../../env");
const { TopicSchema } = require("../schemas/topic");
const { RewardSchema } = require("../schemas/reward");
const { AppendantSchema } = require("../schemas/appendant");
const { AnswerSchema } = require("../schemas/answer");
const { FundSchema } = require("../schemas/fund");
const { ResolveSchema } = require("../schemas/resolve");
const { StatusSchema } = require("../schemas/status");

const scanDb = mongoose.createConnection(SCAN_MONGODB_URI);
scanDb.on("error", () => {
  console.log("Scan DB connection error. Please make sure MongoDB is running.");
  process.exit();
});

const Topic = scanDb.model("Topic", TopicSchema);
const Reward = scanDb.model("Reward", RewardSchema);
const Appendant = scanDb.model("Appendant", AppendantSchema);
const Answer = scanDb.model("Answer", AnswerSchema);
const Fund = scanDb.model("Fund", FundSchema);
const Resolve = scanDb.model("Resolve", ResolveSchema);
const Status = scanDb.model("Status", StatusSchema);

module.exports = {
  Topic,
  Reward,
  Appendant,
  Answer,
  Fund,
  Resolve,
  Status,
};
