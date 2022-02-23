/**
 *
 * @param events all block events
 * @param extrinsicIndex the index of extrinsic at the corresponding block
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

module.exports = {
  extractExtrinsicEvents,
  isExtrinsicSuccess,
}
