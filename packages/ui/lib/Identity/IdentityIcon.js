import React from "react";
import styled from "styled-components";
import { ReactComponent as AuthIcon } from "../imgs/icons/identity/auth.svg";
import { ReactComponent as SubIcon } from "../imgs/icons/identity/sub.svg";
import { ReactComponent as ErrorIcon } from "../imgs/icons/identity/error.svg";
import { ReactComponent as UnauthorizedIcon } from "../imgs/icons/identity/error-grey.svg";
import { ReactComponent as SubGreyIcon } from "../imgs/icons/identity/sub-grey.svg";
import { ReactComponent as SubRedIcon } from "../imgs/icons/identity/sub-red.svg";
import Tooltip from "../Tooltip";

const Wrapper = styled.span`
  position: relative;
  display: flex;
  align-items: center;
`;

export default function IdentityIcon({
  status,
  position,
  offset,
  showTooltip = false,
  size = 14,
}) {
  const statusIconMap = new Map([
    ["NOT_VERIFIED", { icon: UnauthorizedIcon, desc: "Identity not verified" }],
    ["VERIFIED", { icon: AuthIcon, desc: "Identity verified" }],
    ["ERRONEOUS", { icon: ErrorIcon, desc: "Erroneous identity" }],
    ["VERIFIED_LINKED", { icon: SubIcon, desc: "Sub account of verified" }],
    [
      "NOT_VERIFIED_LINKED",
      { icon: SubGreyIcon, desc: "Sub account of unverified" },
    ],
    [
      "ERRONEOUS_LINKED",
      { icon: SubRedIcon, desc: "Sub account of erroneous identity" },
    ],
  ]);

  const StatusIcon = statusIconMap.get(status)?.icon ?? ErrorIcon;
  const statusDesc = statusIconMap.get(status)?.desc ?? "Erroneous identity";

  return (
    <Wrapper>
      <StatusIcon width={size} height={size} />
      {showTooltip && (
        <Tooltip
          content={statusDesc}
          position={position}
          offset={offset}
          size="full"
        >
          <div />
        </Tooltip>
      )}
    </Wrapper>
  );
}
