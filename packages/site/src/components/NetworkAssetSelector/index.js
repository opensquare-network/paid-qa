import { useEffect, useState } from "react";
import styled from "styled-components";
import DropdownSelector from "@osn/common-ui/es/DropdownSelector";
import { IconsMap, NetworkAssets } from "./config";

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

export default function NetworkAssetSelector({
  network,
  setAsset,
  hiddenOnSingleOption,
}) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(NetworkAssets[network]);
    setSelectedAssetIndex(0);
  }, [network]);

  const assetsOptions = assets.map((item, i) => {
    return {
      key: i,
      value: i,
      content: <AssetItem assetKey={item.id} assetName={item.symbol} />,
    };
  });

  useEffect(() => {
    if (setAsset) {
      setAsset(assets[selectedAssetIndex]);
    }
  }, [setAsset, assets, selectedAssetIndex]);

  return hiddenOnSingleOption && assets.length === 1 ? null : (
    <Wrapper>
      <DropdownSelector
        options={assetsOptions}
        value={selectedAssetIndex}
        onSelect={(value) => setSelectedAssetIndex(value)}
      />
    </Wrapper>
  );
}
