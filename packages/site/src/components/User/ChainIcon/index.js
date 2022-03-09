import { ReactComponent as Statemine } from "./icons/statemine.svg";
import { ReactComponent as Polkadot } from "./icons/polkadot.svg";
import { ReactComponent as Khala } from "./icons/khala.svg";
import { ReactComponent as Kusama } from "./icons/kusama.svg";
// import Kintsugi from "public/imgs/logos/kintsugi.svg";
import { ReactComponent as Default } from "./icons/default.svg";
import { ReactComponent as Moonriver } from "./icons/moonriver.svg";

function ChainIcon({ chainName, size = 24 }) {
  switch (chainName) {
    case "polkadot":
      return <Polkadot viewBox="0 0 24 24" width={size} height={size} />;
    case "kusama":
      return <Kusama viewBox="0 0 24 24" width={size} height={size} />;
    case "statemine":
      return <Statemine viewBox="0 0 24 24" width={size} height={size} />;
    case "karura":
      return <img src="/imgs/icons/chain/karura.svg" width={size} alt="" />;
    case "khala":
      return <Khala viewBox="0 0 24 24" width={size} height={size} />;
    case "bifrost":
      return <img src="/imgs/icons/chain/bifrost.svg" width={size} alt="" />;
    // case "kintsugi":
    //   return <Kintsugi viewBox="0 0 24 24" width={size} height={size} />;
    case "moonriver":
      return <Moonriver viewBox="0 0 24 24" width={size} height={size} />;
    default:
      return <Default viewBox="0 0 24 24" width={size} height={size} />;
  }
}

export default ChainIcon;
