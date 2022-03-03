const mongoose = require("mongoose");
const { MONGODB_URI } = require("../env");
const Topic = require("./topic");
const Reward = require("./reward");
const Answer = require("./answer");

mongoose.connect(MONGODB_URI);
mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

module.exports = {
  Topic,
  Reward,
  Answer,
};
