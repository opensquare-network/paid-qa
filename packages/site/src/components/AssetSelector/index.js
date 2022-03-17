import { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/lib/DropdownSelector";

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
}

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
    { id: "polkadot", name: "Polkadot", symbol: "DOT", tokenIdentifier: "N" },
  ],
  kusama: [
    { id: "kusama", name: "Kusama", symbol: "KSM", tokenIdentifier: "N" },
  ],
  statemine: [
    { id: "kusama", name: "Kusama", symbol: "KSM", tokenIdentifier: "N" },
    { id: "rmrk", name: "RMRK", symbol: "RMRK", tokenIdentifier: "8" },
    {
      id: "polarisdao",
      name: "PolarisDAO",
      symbol: "ARIS",
      tokenIdentifier: "16",
    },
  ],
  karura: [
    { id: "karura", name: "Karura", symbol: "KAR", tokenIdentifier: "N" },
  ],
  khala: [{ id: "khala", name: "Khala", symbol: "PHA", tokenIdentifier: "N" }],
  bifrost: [
    { id: "bifrost", name: "Bifrost", symbol: "BNC", tokenIdentifier: "N" },
  ],
  kintsugi: [
    { id: "kintsugi", name: "Kintsugi", symbol: "KINT", tokenIdentifier: "N" },
  ],
  westend: [
    { id: "westend", name: "Westend", symbol: "WND", tokenIdentifier: "N" },
  ],
};

export default function AssetSelector({ network, setAsset }) {
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
    <DropdownSelector
      options={assetsOptions}
      value={selectedAssetIndex}
      onSelect={(value) => setSelectedAssetIndex(value)}
    />
  );
}
