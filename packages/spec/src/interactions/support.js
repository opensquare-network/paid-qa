const { NewInteraction } = require("./new");

class SupportInteraction extends NewInteraction {
  static symbol = 'S';
  static argsCount = 3;
}

module.exports = {
  SupportInteraction,
}
