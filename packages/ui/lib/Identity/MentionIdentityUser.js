import React from "react";
import { css } from "styled-components";
import { secondary_blue_100, secondary_blue_500 } from "../styles/colors";
import LinkIdentityUser from "./LinkIdentityUser";

const styles = css`
  font-weight: 500;
  display: inline-flex;
  padding: 0 8px;
  color: ${secondary_blue_500};
  background-color: ${secondary_blue_100};
  border-radius: 4px;

  .mention {
    margin-right: 2px;
  }
`;

export default function MentionIdentityUser({
  network,
  address,
  items = ["networkIcon", "identityIcon", "text"],
  explore,
  hashRoute,
  href,
  ...restProps
}) {
  return (
    <LinkIdentityUser
      prefix={<span className="mention">@</span>}
      items={items}
      network={network}
      address={address}
      extraCss={styles}
      explore={explore}
      hashRoute={hashRoute}
      href={href}
      {...restProps}
    />
  );
}
