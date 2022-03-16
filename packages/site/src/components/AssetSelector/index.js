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

function getAssetIcon(assetKey) {
  switch (assetKey) {
    case "karura": {
      return <img src={"/imgs/icons/assets/karura.svg"} alt="" width={"24px"} height={"24px"} />
    }
    case "rmrk": {
      return <img src={"/imgs/icons/assets/rmrk.svg"} alt="" width={"24px"} height={"24px"} />
    }
    case "polarisdao": {
      return <img src={"/imgs/icons/assets/polarisdao.png"} alt="" width={"24px"} height={"24px"} />
    }
    default: {
      return <img src={"/imgs/icons/assets/unknown.svg"} alt="" width={"24px"} height={"24px"} />;
    }
  }
}

function AssetItem({ assetKey, assetName }) {
  return (
    <AssetWrapper>
      {getAssetIcon(assetKey)}
      <span>{assetName}</span>
    </AssetWrapper>
  );
}

const assets = [
  { id: "karura", name: "Karura", symbol: "KAR" },
  { id: "rmrk", name: "RMRK", symbol: "RMRK" },
  { id: "polarisdao", name: "PolarisDAO", symbol: "ARIS" },
];

const assetsOptions = assets.map((item, i) => {
  return {
    key: i,
    value: i,
    content: <AssetItem assetKey={item.id} assetName={item.name} />,
  };
});

export default function AssetSelector({ setAsset }) {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState(0);

  useEffect(() => {
    if (setAsset) {
      setAsset(assets[selectedAssetIndex].symbol);
    }
  }, [setAsset, selectedAssetIndex]);

  return (
    <DropdownSelector
      options={assetsOptions}
      value={selectedAssetIndex}
      onSelect={(value) => setSelectedAssetIndex(value)}
    />
  );
}
