import React from "react";
import styled from "styled-components";
import IdentityUser from "./IdentityUser";
import { encodeNetworkAddress } from "@osn/common/src/utils/address";
import { isExternalLink } from "@osn/common/src/utils/url";
import { getAddressLink } from "@osn/common/src/utils/blockExplorer";

const Link = styled.a`
  ${(p) => p.extraCss}
`;

export default function LinkIdentityUser({
  network,
  address,
  items = ["networkIcon", "identityIcon", "text"],
  prefix,
  extraCss,
  explore,
  hashRoute,
  href = "",
  ...restProps
}) {
  let linkProps = {
    href,
  };

  let ss58Address = address;
  if (address && network) {
    ss58Address = encodeNetworkAddress(address, network);
  }

  // NOTE: not sure if universal usage, but now works in qa
  if (hashRoute) {
    linkProps.href = `/#/network/${network}/address/${ss58Address}`;
  }
  // open statescan/subscan
  else if (explore) {
    linkProps.href = getAddressLink(network, address);
  }

  if (isExternalLink(linkProps.href)) {
    linkProps = {
      ...linkProps,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: (e) => e.stopPropagation(),
    };
  }

  return (
    <Link {...restProps} {...linkProps} extraCss={extraCss}>
      {prefix}
      <IdentityUser items={items} network={network} address={ss58Address} />
    </Link>
  );
}
