import Identicon from "@polkadot/react-identicon";

export default function Avatar({ address, size = 20 }) {
  return <Identicon value={address} size={size} theme="polkadot" />;
}
