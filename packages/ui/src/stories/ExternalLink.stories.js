import ExternalLink from "../../lib/ExternalLink";

export default {
  title: "ExternalLink",
  component: ExternalLink,
};

export const primary = () => (
  <span>
    Open
    <ExternalLink href="https://www.opensquare.network">
      OpenSquare
    </ExternalLink>
    in new tab.
  </span>
);
