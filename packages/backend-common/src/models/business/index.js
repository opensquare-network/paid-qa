const mongoose = require("mongoose");
const { MONGODB_URI } = require("../../env");
const { TopicSchema } = require("./topic");
const { RewardSchema } = require("./reward");
const { AppendantSchema } = require("./appendant");
const { AnswerSchema } = require("./answer");
const { FundSchema } = require("./fund");
const { ResolveSchema } = require("./resolve");
const { NotificationEvent, NotificationSchema } = require("./notification");
const { ReportSchema } = require("./report");
const { FulfillSchema } = require("./fulfill");

const businessDb = mongoose.createConnection(MONGODB_URI);
businessDb.on("error", () => {
  console.log(
    "Business DB connection error. Please make sure MongoDB is running."
  );
  process.exit();
});

const Topic = businessDb.model("Topic", TopicSchema);
const Reward = businessDb.model("Reward", RewardSchema);
const Appendant = businessDb.model("Appendant", AppendantSchema);
const Answer = businessDb.model("Answer", AnswerSchema);
const Fund = businessDb.model("Fund", FundSchema);
const Resolve = businessDb.model("Resolve", ResolveSchema);
const Notification = businessDb.model("Notification", NotificationSchema);
const Report = businessDb.model("Report", ReportSchema);
const Fulfill = businessDb.model("Fulfill", FulfillSchema);

module.exports = {
  connection: businessDb,
  Topic,
  Reward,
  Appendant,
  Answer,
  Fund,
  Resolve,
  Notification,
  NotificationEvent,
  Report,
  Fulfill,
};
