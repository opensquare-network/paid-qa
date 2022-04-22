import { matchMdLink, replaceMentionLinks } from "./utils";

test("matchMdLink", () => {
  expect(
    matchMdLink(`##HELLO, 
  https://www.opensquare.io/ is a great website`)
  ).toBe(`##HELLO, 
  [https://www.opensquare.io/](https://www.opensquare.io/) is a great website`);
});

test("replaceMentionLinks", () => {
  expect(
    replaceMentionLinks(
      `[@DBUi...31H9](/network/westend/address/DBUiVmKrTsv4hetpCRtvmFLgJ54jjwY9QRJqPAQVijP31H9)`
    )
  ).toBe(
    `[@DBUi...31H9](/#/network/westend/address/DBUiVmKrTsv4hetpCRtvmFLgJ54jjwY9QRJqPAQVijP31H9) `
  );
});
