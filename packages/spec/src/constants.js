const PROTOCOL = Object.freeze({
  NETWORK: "osn",
  COLLABORATION: "q",
  VERSION: "1",
})

const INTERACTIONS = Object.freeze({
  NEW: "NEW",
  APPEND: "APPEND",
  SUPPORT: "SUPPORT",
  ANSWER: "ANSWER",
  FUND: "FUND",
  RESOLVE: "RESOLVE",
})

const INTERACTION_SYMBOLS = Object.freeze({
  [INTERACTIONS.NEW]: "N",
  [INTERACTIONS.APPEND]: "A",
  [INTERACTIONS.SUPPORT]: "S",
  [INTERACTIONS.ANSWER]: "AS",
  [INTERACTIONS.FUND]: "F",
  [INTERACTIONS.RESOLVE]: "R",
})

module.exports = {
  INTERACTIONS,
  INTERACTION_SYMBOLS,
  PROTOCOL,
}
