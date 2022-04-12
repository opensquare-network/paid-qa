import timeDuration from "../lib/utils/timeDuration";

test("timeDuration", () => {
  const now = Math.floor(new Date().getTime() / 1000) * 1000;
  expect(timeDuration(now)).toBe("0s ago");
  expect(timeDuration(now - 61 * 1000)).toBe("1min 1s ago");
  expect(timeDuration(now - 3661 * 1000)).toBe("1h 1min ago");
  expect(timeDuration(now - 90000 * 1000)).toBe("1d 1h ago");
  expect(timeDuration(now - Math.pow(10, 10))).toBe("3mos ago");
  expect(timeDuration(now - Math.pow(10, 11))).toBe("3y 2mos ago");
});
