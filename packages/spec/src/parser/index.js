const { InteractionInvalid } = require("../types/InteractionInvalid");
const { PROTOCOL, INTERACTION_SYMBOLS, } = require("../constants")
const interactions = require("../interactions")

class InteractionParser {
  #remark;
  #valid = false;
  #interaction;
  #parsed = false;

  constructor(remark = "") {
    this.#remark = remark;
  }

  #parse() {
    if (typeof this.#remark !== 'string') {
      this.#valid = false;
      return
    }

    const items = this.#remark.split(":");
    if (items.length < 5) {
      this.#valid = false
    } else if (
      items[0].toLowerCase() !== PROTOCOL.NETWORK ||
      items[1].toLowerCase() !== PROTOCOL.COLLABORATION ||
      items[2].toLowerCase() !== PROTOCOL.VERSION ||
      !Object.values(INTERACTION_SYMBOLS).includes(items[3])
    ) {
      this.#valid = false
    }

    const protocolPrefixLength = 4;
    const interactionArgs = items.slice(4);
    const directive = items[3];
    for (const Interaction of Object.values(interactions)) {
      if (directive === Interaction.symbol) {
        const argsCountValid = Interaction.argsCount === items.length - protocolPrefixLength;
        this.#interaction = new Interaction(...interactionArgs);
        this.#valid = argsCountValid && this.#interaction.isValid
      }
    }
  }

  get isValid() {
    if (!this.#parsed) {
      this.#parse();
      this.#parsed = true;
    }
    return this.#valid;
  }

  getInteraction() {
    if (!this.#parsed) {
      this.#parse();
      this.#parsed = true;
    }

    if (!this.#valid) {
      throw new InteractionInvalid();
    }

    return this.#interaction;
  }
}

module.exports = {
  InteractionParser,
}
