const { InteractionInvalid } = require("../types/InteractionInvalid");
const { PROTOCOL } = require("../constants")
const interactions = require("../interactions")

class InteractionEncoder {
  #interaction;
  #remark;

  constructor(interaction) {
    this.#interaction = interaction;
  }

  getRemark() {
    if (!this.#remark) {
      this.#remark = this.#encode();
    }
    return this.#remark;
  }

  #encode() {
    if (!this.isValid) {
      throw new InteractionInvalid();
    }

    // Find class of the instruction
    let InstructionClass;
    for (const Interaction of Object.values(interactions)) {
      if (this.#interaction instanceof Interaction) {
        InstructionClass = Interaction;
        break;
      }
    }

    if (!InstructionClass) {
      throw new InteractionInvalid();
    }

    return [
      PROTOCOL.NETWORK,
      PROTOCOL.COLLABORATION,
      PROTOCOL.VERSION,
      InstructionClass.symbol,
      ...this.#interaction.args,
    ].join(":");
  }

  get isValid() {
    if (!this.#interaction) {
      return false;
    }
    return this.#interaction.isValid;
  }
}

module.exports = {
  InteractionEncoder,
}
