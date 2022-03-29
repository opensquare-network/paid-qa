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
  {
    id: "karura",
    name: "Karura",
    symbol: "KAR",
  },
  {
    id: "khala",
    name: "Khala",
    symbol: "PHA",
  },
  {
    id: "bifrost",
    name: "Bifrost",
    symbol: "BNC",
  },
  {
    id: "kintsugi",
    name: "Kintsugi",
    symbol: "KINT",
  },
  {
    id: "westend",
    name: "Westend",
    symbol: "WND",
  },
];

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
