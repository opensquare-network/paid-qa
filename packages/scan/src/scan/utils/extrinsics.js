/**
 *
 * @param events all block events
 * @param extrinsicIndex: Number. the index of extrinsic at the corresponding block
 * @returns true|false
 */
function extractExtrinsicEvents(events, extrinsicIndex) {
  return events.filter((event) => {
    const { phase } = event;
    return !phase.isNone && phase.value.toNumber() === extrinsicIndex;
  });
}

/**
 * Check whether a extrinsic is executed successfully by the extrinsic events
 * @param events: the events of the extrinsic
 * @returns true|false
 */
function isExtrinsicSuccess(events) {
  return events.some((e) => e.event.method === "ExtrinsicSuccess");
}

function extrinsicSuccess(blockEvents, extrinsicIndex) {
  const extrinsicEvents = extractExtrinsicEvents(blockEvents, extrinsicIndex);
  return isExtrinsicSuccess(extrinsicEvents);
}

module.exports = {
  extractExtrinsicEvents,
  isExtrinsicSuccess,
  extrinsicSuccess,
}
