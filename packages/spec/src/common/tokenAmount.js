function isTokenAmountValid(value) {
  return /^\d+(\.?\d+)?$/.test(value)
}

module.exports = {
  isTokenAmountValid,
}
