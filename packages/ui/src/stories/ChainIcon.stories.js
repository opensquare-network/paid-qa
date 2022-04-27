import React from "react";
import ChainIcon from "../../lib/Chain/ChainIcon";
import Flex from "../../lib/styled/Flex";

export default {
  title: "ChainIcon",
  component: ChainIcon,
};
export const Unknown = () => <ChainIcon />;

export const Available = () => {
  return (
    <Flex style={{ gap: 8, padding: 40 }}>
      <ChainIcon chainName="polkadot" showTooltip />
      <ChainIcon chainName="kusama" showTooltip />
      <ChainIcon chainName="statemine" showTooltip />
      <ChainIcon chainName="karura" showTooltip />
      <ChainIcon chainName="khala" showTooltip />
      <ChainIcon chainName="bifrost" showTooltip />
      <ChainIcon chainName="kintsugi" showTooltip />
      <ChainIcon chainName="moonriver" showTooltip />
      <ChainIcon chainName="westend" showTooltip />
      <ChainIcon chainName="interlay" showTooltip />
      <ChainIcon chainName="acala" showTooltip />
      <ChainIcon chainName="polkadex" showTooltip />
      <ChainIcon chainName="crust" showTooltip />
      <ChainIcon chainName="ethereum" showTooltip />
    </Flex>
  );
};
