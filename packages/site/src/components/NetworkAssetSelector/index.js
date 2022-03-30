import { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/lib/DropdownSelector";

const Wrapper = styled.div`
  > div div {
    z-index: 10;
  }
`;

const AssetWrapper = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 8px;
  }
`;

const IconsMap = {
  karura: "karura.svg",
  rmrk: "rmrk.svg",
  polarisdao: "polarisdao.png",
};

function getAssetIcon(assetKey) {
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

const NetworkAssets = {
  polkadot: [
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      decimals: 10,
      tokenIdentifier: "N",
    },
  ],
  kusama: [
    {
      id: "kusama",
      name: "Kusama",
      symbol: "KSM",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  statemine: [
    {
      id: "kusama",
      name: "Kusama",
      symbol: "KSM",
      decimals: 12,
      tokenIdentifier: "N",
    },
    {
      id: "rmrk",
      name: "RMRK",
      symbol: "RMRK",
      decimals: 10,
      tokenIdentifier: "8",
    },
    {
      id: "polarisdao",
      name: "PolarisDAO",
      symbol: "ARIS",
      tokenIdentifier: "16",
      decimals: 8,
    },
  ],
  karura: [
    {
      id: "karura",
      name: "Karura",
      symbol: "KAR",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  khala: [
    {
      id: "khala",
      name: "Khala",
      symbol: "PHA",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  bifrost: [
    {
      id: "bifrost",
      name: "Bifrost",
      symbol: "BNC",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  kintsugi: [
    {
      id: "kintsugi",
      name: "Kintsugi",
      symbol: "KINT",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
  westend: [
    {
      id: "westend",
      name: "Westend",
      symbol: "WND",
      decimals: 12,
      tokenIdentifier: "N",
    },
  ],
};

export default function NetworkAssetSelector({ network, setAsset }) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const assets = NetworkAssets[network];
  const assetsOptions = assets.map((item, i) => {
    return {
      key: i,
      value: i,
      content: <AssetItem assetKey={item.id} assetName={item.name} />,
    };
  });

  useEffect(() => {
    if (setAsset) {
      setAsset(assets[selectedAssetIndex]);
    }
  }, [setAsset, assets, selectedAssetIndex]);

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
