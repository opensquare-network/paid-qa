const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
} = require("@osn/scan-common");

function extrinsicSuccess(blockEvents, extrinsicIndex) {
  const extrinsicEvents = extractExtrinsicEvents(blockEvents, extrinsicIndex);
  return isExtrinsicSuccess(extrinsicEvents);
}

module.exports = {
  extractExtrinsicEvents,
  isExtrinsicSuccess,
  extrinsicSuccess,
};
