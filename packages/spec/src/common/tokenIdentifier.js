const u32Max = 4294967295;

function isNumber(value) {
  if (typeof value !== 'number') {
    return false
  }

  return !isNaN(parseInt(value));
}

function isU32(value) {
  if (!isNumber(value)) {
    return false
  }

  const parsed = parseInt(value)
  return 0 <= parsed && parsed <= u32Max;
}

/**
 * This function check the syntax of the token identifier. In qa spec 1.0, the identifier can be a 'N' or a u32 number.
 * 'N' represents the native token of a chain, while u32 represents the asset id of Statemine or Statemint.
 * @param value: the token identifier
 * @returns {boolean}
 */
function isTokenIdentifierValid(value) {
  if (value === 'N') {
    return true;
  }

  if (!/\d+/.test(value)) {
    return false;
  }

  return isU32(value);
}

module.exports = {
  isTokenIdentifierValid,
}
