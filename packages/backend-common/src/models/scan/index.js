const mongoose = require("mongoose");
const { SCAN_MONGODB_URI } = require("../../env");
const { TopicSchema } = require("./topic");
const { RewardSchema } = require("./reward");
const { AppendantSchema } = require("./appendant");
const { AnswerSchema } = require("./answer");
const { FundSchema } = require("./fund");
const { ResolveSchema } = require("./resolve");
const { StatusSchema } = require("./status");

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
  connection: scanDb,
  Topic,
  Reward,
  Appendant,
  Answer,
  Fund,
  Resolve,
  Status,
};
