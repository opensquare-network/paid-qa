class InteractionInvalid extends Error {
  constructor(...params) {
    super(params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InteractionInvalid)
    }

    this.name = 'InteractionInvalid'
  }
}

module.exports = {
  InteractionInvalid,
}
