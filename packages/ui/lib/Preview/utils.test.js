import { replaceMentionLinks } from "./utils";

test("replaceMentionLinks", () => {
  expect(
    replaceMentionLinks(
      `[@DBUi...31H9](/network/westend/address/DBUiVmKrTsv4hetpCRtvmFLgJ54jjwY9QRJqPAQVijP31H9)`
    )
  ).toBe(
    `[@DBUi...31H9](/#/network/westend/address/DBUiVmKrTsv4hetpCRtvmFLgJ54jjwY9QRJqPAQVijP31H9) `
  );
});
