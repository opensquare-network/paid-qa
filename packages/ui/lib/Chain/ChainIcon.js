import React from "react";
import { ReactComponent as Bifrost } from "../imgs/icons/chain/bifrost.svg";
import { ReactComponent as Statemine } from "../imgs/icons/chain/statemine.svg";
import { ReactComponent as Polkadot } from "../imgs/icons/chain/polkadot.svg";
import { ReactComponent as Khala } from "../imgs/icons/chain/khala.svg";
import { ReactComponent as Kusama } from "../imgs/icons/chain/kusama.svg";
import { ReactComponent as Kintsugi } from "../imgs/icons/chain/kintsugi.svg";
import { ReactComponent as Default } from "../imgs/icons/chain/default.svg";
import { ReactComponent as Moonriver } from "../imgs/icons/chain/moonriver.svg";
import { ReactComponent as Westend } from "../imgs/icons/chain/westend.svg";
import { ReactComponent as Interlay } from "../imgs/icons/chain/interlay.svg";
import { ReactComponent as Acala } from "../imgs/icons/chain/acala.svg";
import { ReactComponent as Polkadex } from "../imgs/icons/chain/polkadex.svg";
import { ReactComponent as Crust } from "../imgs/icons/chain/crust.svg";
import { ReactComponent as Ethereum } from "../imgs/icons/chain/ethereum.svg";
import styled from "styled-components";
import Tooltip from "../Tooltip";

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

function ResolveChainIcon({ chainName, size = 24 }) {
  switch (chainName) {
    case "polkadot":
      return <Polkadot viewBox="0 0 24 24" width={size} height={size} />;
    case "kusama":
      return <Kusama viewBox="0 0 24 24" width={size} height={size} />;
    case "statemine":
      return <Statemine viewBox="0 0 24 24" width={size} height={size} />;
    case "karura":
      return <Kintsugi viewBox="0 0 24 24" width={size} height={size} />;
    case "khala":
      return <Khala viewBox="0 0 24 24" width={size} height={size} />;
    case "bifrost":
      return <Bifrost viewBox="0 0 24 24" width={size} height={size} />;
    case "kintsugi":
      return <Kintsugi viewBox="0 0 24 24" width={size} height={size} />;
    case "moonriver":
      return <Moonriver viewBox="0 0 24 24" width={size} height={size} />;
    case "westend":
      return <Westend viewBox="0 0 24 24" width={size} height={size} />;
    case "interlay":
      return <Interlay viewBox="0 0 24 24" width={size} height={size} />;
    case "acala":
      return <Acala viewBox="0 0 24 24" width={size} height={size} />;
    case "polkadex":
      return <Polkadex viewBox="0 0 24 24" width={size} height={size} />;
    case "crust":
      return <Crust viewBox="0 0 24 24" width={size} height={size} />;
    case "ethereum":
      return <Ethereum viewBox="0 0 24 24" width={size} height={size} />;
    default:
      return <Default viewBox="0 0 24 24" width={size} height={size} />;
  }
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function ChainIcon({
  chainName,
  position,
  offset,
  showTooltip = false,
  size = 24,
}) {
  const Icon = ResolveChainIcon({ chainName, size });
  return (
    <Wrapper>
      {Icon}
      {showTooltip && (
        <Tooltip
          content={capitalize(chainName)}
          position={position}
          offset={offset}
          size="full"
        >
          <></>
        </Tooltip>
      )}
    </Wrapper>
  );
}

export default ChainIcon;
