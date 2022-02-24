const { NewInteraction } = require("./new");

class SupportInteraction extends NewInteraction {
  static symbol = 'S';
}

module.exports = {
  SupportInteraction,
}
