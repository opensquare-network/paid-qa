import { ReactComponent as Bifrost } from "../imgs/icons/chain/bifrost.svg";
import { ReactComponent as Statemine } from "../imgs/icons/chain/statemine.svg";
import { ReactComponent as Polkadot } from "../imgs/icons/chain/polkadot.svg";
import { ReactComponent as Khala } from "../imgs/icons/chain/khala.svg";
import { ReactComponent as Kusama } from "../imgs/icons/chain/kusama.svg";
import { ReactComponent as Kintsugi } from "../imgs/icons/chain/kintsugi.svg";
import { ReactComponent as Default } from "../imgs/icons/chain/default.svg";
import { ReactComponent as Moonriver } from "../imgs/icons/chain/moonriver.svg";
import { ReactComponent as Westend } from "../imgs/icons/chain/westend.svg";

function ChainIcon({ chainName, size = 24 }) {
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
    default:
      return <Default viewBox="0 0 24 24" width={size} height={size} />;
  }
}

export default ChainIcon;
