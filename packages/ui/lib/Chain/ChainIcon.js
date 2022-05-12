import React from "react";
import { ReactComponent as Statemine } from "../imgs/icons/chain/statemine.svg";
import { ReactComponent as Polkadot } from "../imgs/icons/chain/polkadot.svg";
import { ReactComponent as Khala } from "../imgs/icons/chain/khala.svg";
import { ReactComponent as Kusama } from "../imgs/icons/chain/kusama.svg";
import { ReactComponent as Default } from "../imgs/icons/chain/default.svg";
import { ReactComponent as Moonriver } from "../imgs/icons/chain/moonriver.svg";
import { ReactComponent as Interlay } from "../imgs/icons/chain/interlay.svg";
import { ReactComponent as Polkadex } from "../imgs/icons/chain/polkadex.svg";
import { ReactComponent as Crust } from "../imgs/icons/chain/crust.svg";
import { ReactComponent as Ethereum } from "../imgs/icons/chain/ethereum.svg";
import Westend from "../imgs/icons/chain/westend.png";
import Bifrost from "../imgs/icons/chain/bifrost.png";
import Kintsugi from "../imgs/icons/chain/kintsugi.png";
import Acala from "../imgs/icons/chain/acala.png";
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
    case "westmint":
      return <Statemine viewBox="0 0 24 24" width={size} height={size} />;
    case "khala":
      return <Khala viewBox="0 0 24 24" width={size} height={size} />;
    case "bifrost":
      return <img src={Bifrost} width={size} alt={chainName} />;
    case "kintsugi":
    case "karura":
      return <img src={Kintsugi} width={size} alt={chainName} />;
    case "moonriver":
      return <Moonriver viewBox="0 0 24 24" width={size} height={size} />;
    case "westend":
      return <img src={Westend} width={size} alt={chainName} />;
    case "interlay":
      return <Interlay viewBox="0 0 24 24" width={size} height={size} />;
    case "acala":
      return <img src={Acala} width={size} alt={chainName} />;
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
