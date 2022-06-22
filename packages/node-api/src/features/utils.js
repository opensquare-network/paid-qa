function extractExtrinsicEvents(events, extrinsicIndex) {
  return events.filter((event) => {
    const { phase } = event;
    return !phase.isNone && phase.value.toNumber() === extrinsicIndex;
  });
}

function isExtrinsicSuccess(events, extrinsicIndex) {
  const extrinsicEvents = extractExtrinsicEvents(events, extrinsicIndex);
  return extrinsicEvents.some((e) => e.event.method === "ExtrinsicSuccess");
}

function isBatchSuccess(events, extrinsicIndex) {
  const extrinsicEvents = extractExtrinsicEvents(events, extrinsicIndex);
  return !extrinsicEvents.some((e) => e.event.method === "BatchInterrupted");
}

function extractBlockTime(extrinsics) {
  const setTimeExtrinsic = extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set"
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

module.exports = {
  isExtrinsicSuccess,
  isBatchSuccess,
  extractBlockTime,
};
