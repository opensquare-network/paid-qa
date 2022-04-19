import styled, { css } from "styled-components";

import Avatar from "@osn/common-ui/lib/Account/Avatar";
import Name from "../User/Name";
import ExternalLink from "@osn/common-ui/lib/ExternalLink";
import { MOBILE_SIZE } from "@osn/consts";
import { p_14_normal } from "@osn/common-ui/lib/styles/textStyles";
import Flex from "@osn/common-ui/lib/styled/Flex";
import { ReactComponent as CopyIcon } from "../Post/Detail/icons/copy.svg";
import Tooltip from "@osn/common-ui/lib/Tooltip";
import { useCallback, useState } from "react";
import copy from "copy-to-clipboard";
import FlexCenter from "@osn/common-ui/lib/styled/FlexCenter";
import { addressEllipsis } from "@osn/common/src/utils/address";

const Wrapper = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  > :nth-child(2) {
    flex-basis: 100%;
    > :first-child {
      font-weight: 600;
      line-height: 32px;
    }
    > :nth-child(2) {
      ${p_14_normal};
      color: #506176;
    }
  }
  object > div {
    justify-content: center;
  }
  a {
    display: block;
  }
`;

const AddressWrapper = styled(FlexCenter)`
  @media screen and (max-width: ${MOBILE_SIZE}px) {
    margin-bottom: 16px;
  }
  position: relative;
  left: 10px;
  > div:last-child {
    visibility: hidden;
  }
  :hover {
    > div:last-child {
      visibility: visible;
    }
  }
`;

const Text = styled.span`
  display: block;
  word-break: break-all;
  text-align: center;
`;

const CopyButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 4px;
  :hover {
    svg path {
      fill: #506176;
    }
  }
  ${(p) =>
    p.isCopied &&
    css`
      svg path {
        fill: #506176;
      }
    `}
`;

export default function Profile({ network, address }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = useCallback(() => {
    copy(address);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [address]);

  return (
    <Wrapper>
      <Avatar address={address} size={64} />
      <div>
        <ExternalLink href={`https://${network}.subscan.io/account/${address}`}>
          <object>
            <Name network={network} address={address} noLink={true} />
          </object>
        </ExternalLink>
        <AddressWrapper>
          <Text>{addressEllipsis(address, 8, 8)}</Text>
          <Tooltip content={isCopied ? "Copied" : "Copy Address"} size="fit">
            <div>
              <CopyButton
                hoverBgColor={"#EDF7ED"}
                hoverIconColor={"#4CAF50"}
                onClick={copyAddress}
                isCopied={isCopied}
              >
                <CopyIcon />
              </CopyButton>
            </div>
          </Tooltip>
        </AddressWrapper>
      </div>
    </Wrapper>
  );
}
