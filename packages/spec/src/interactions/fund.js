const { AnswerInteraction } = require("./answer");

class FundInteraction extends AnswerInteraction {
  static symbol = 'F';
}

module.exports = {
  FundInteraction,
}
