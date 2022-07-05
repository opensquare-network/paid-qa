import styled from "styled-components";
import IdentityUser from "./IdentityUser";
import { encodeNetworkAddress } from "@osn/common/src/utils/address";
import {
  secondary_blue_100,
  secondary_blue_500,
} from "@osn/common-ui/lib/styles/colors";

const Link = styled.a`
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

export default function MentionIdentityUser({ network, address }) {
  let ss58Address = address;
  if (address && network) {
    ss58Address = encodeNetworkAddress(address, network);
  }

  return (
    <Link href={`/#/network/${network}/address/${ss58Address}`}>
      <span className="mention">@</span>
      <IdentityUser
        items={["networkIcon", "identityIcon", "text"]}
        network={network}
        address={ss58Address}
      />
    </Link>
  );
}
