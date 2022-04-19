import {
  addressEllipsis,
  encodeNetworkAddress,
  isSamePublicKey,
} from "../lib/utils/address";

test("addressEllipsis", () => {
  expect(addressEllipsis("hahaxxxxxxxxxhoho")).toBe(`haha...hoho`);
});

test("encodeNetworkAddress", () => {
  expect(
    encodeNetworkAddress(
      "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      "westend"
    )
  ).toBe(`E7fUYKtqKc4brRTmQygJAXLprCTmxQg3wmdvBhg1t5VDLcw`);
  expect(
    encodeNetworkAddress(
      "5Dc3pDz2Cxb8rCc1ziAdQDALgFvDyHbVbZvtXXRiY5rzUMfN",
      "polkadot"
    )
  ).toBe(`12YLxZF64jrcHjcXxMDdYMzVXsusfb9dg4fNgpR56AtWecqT`);
});

test("isSamePubKey", () => {
  expect(
    isSamePublicKey(
      "E7fUYKtqKc4brRTmQygJAXLprCTmxQg3wmdvBhg1t5VDLcw",
      "12YLxZF64jrcHjcXxMDdYMzVXsusfb9dg4fNgpR56AtWecqT"
    )
  ).toBe(true);
  expect(
    isSamePublicKey(
      "E7fUYKtqKc4brRTmQygJAXLprCTmxQg3wmdvBhg1t5VDLcw",
      "Fvk5NrmiD2vhMVAb1cShi3ngHqbjbZwDkxCV4rc7s567JCL"
    )
  ).toBe(false);
});
