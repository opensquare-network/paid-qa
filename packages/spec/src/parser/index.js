const { InteractionInvalid } = require("./types/InteractionInvalid");
const { PROTOCOL } = require("./constants")

class InteractionParser {
  #remark;

  constructor(remark = "") {
    this.#remark = remark;
  }

  parse() {
    if (typeof this.#remark !== 'string') {
      throw new InteractionInvalid('Invalid remark type');
    }

    const items = this.#remark.split(":");
    if (items.length < 5) {
      throw new InteractionInvalid("Invalid interactions items count");
    }

    if (items[0].toLowerCase() !== PROTOCOL.NETWORK) {
      throw new InteractionInvalid("Invalid network");
    }
    if (items[1].toLowerCase() !== PROTOCOL.COLLABORATION) {
      throw new InteractionInvalid("Invalid collaboration");
    }
    if (items[2].toLowerCase() !== PROTOCOL.VERSION) {
      throw new InteractionInvalid("Invalid version");
    }
  }
}

module.exports = {
  InteractionParser,
}
