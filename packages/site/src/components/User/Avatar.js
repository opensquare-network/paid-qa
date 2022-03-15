import Avatar from "@osn/common-ui/lib/Account/Avatar";

export default function Avatar({ address, size = 20 }) {
  return <Avatar value={address} size={size} theme="polkadot" />;
}
