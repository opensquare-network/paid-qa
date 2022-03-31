import { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/lib/DropdownSelector";
import Flex from "@osn/common-ui/lib/styled/Flex";

const Wrapper = styled.div`
  > div div {
    z-index: 10;
  }
`;

const AssetWrapper = styled(Flex)`
  > :first-child {
    margin-right: 8px;
  }
`;

const IconsMap = {
  karura: "karura.svg",
  rmrk: "rmrk.svg",
  polarisdao: "polarisdao.png",
  polkadot: "polkadot.svg",
  kusama: "kusama.svg",
  khala: "khala.svg",
  bifrost: "bifrost.svg",
  kintsugi: "kintsugi.svg",
};

function getAssetIcon(assetKey) {
  if (assetKey === "all") {
    return null;
  }
  const icon = IconsMap[assetKey] || "unknown.svg";
  return (
    <img
      src={`/imgs/icons/assets/${icon}`}
      alt=""
      width={"24px"}
      height={"24px"}
    />
  );
}

function AssetItem({ assetKey, assetName }) {
  return (
    <AssetWrapper>
      {getAssetIcon(assetKey)}
      <span>{assetName}</span>
    </AssetWrapper>
  );
}

const Assets = [
  {
    id: "all",
    name: "All Assets",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
  },
  {
    id: "kusama",
    name: "Kusama",
    symbol: "KSM",
  },
  {
    id: "rmrk",
    name: "RMRK",
    symbol: "RMRK",
  },
  {
    id: "polarisdao",
    name: "PolarisDAO",
    symbol: "ARIS",
  },
];
if (process.env.REACT_APPSHOW_WESTEND === "TRUE") {
  Assets.push({
    id: "westend",
    name: "Westend",
    symbol: "WND",
  });
}

export default function AssetSelector({ asset, setAsset }) {
  const index = Assets.findIndex((item) => item.id === asset?.id);
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(
    index === -1 ? 0 : index
  );
  const assetsOptions = Assets.map((item, i) => {
    return {
      key: i,
      value: i,
      content: <AssetItem assetKey={item.id} assetName={item.name} />,
    };
  });

  useEffect(() => {
    if (setAsset) {
      setAsset(Assets[selectedAssetIndex]);
    }
  }, [setAsset, selectedAssetIndex]);

  return (
    <Wrapper>
      <DropdownSelector
        options={assetsOptions}
        value={selectedAssetIndex}
        onSelect={(value) => setSelectedAssetIndex(value)}
      />
    </Wrapper>
  );
}
