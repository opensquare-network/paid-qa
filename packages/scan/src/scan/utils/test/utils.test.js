const { getTargetHeight, getHeights } = require("../index");
const { setScanStep } = require("../../../common/env");
const { setFinalizedHeight } = require("../../../chain/finalized")

describe("Utils:", () => {
  test("getTargetHeight works", () => {
    setFinalizedHeight(100);
    setScanStep(10);

    expect(getTargetHeight(95)).toEqual(100);
    expect(getTargetHeight(1)).toEqual(11);
  })

  test("getHeights works", () => {
    expect(getHeights(1, 3)).toEqual([1, 2, 3])
  })
})
