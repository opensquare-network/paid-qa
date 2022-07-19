import Button from "../styled/Button";

/**
 * @param {import("./types").ConnectWalletModalProps} props
 */
export default function ConnectWalletButton(props) {
  const { setVisible } = props ?? {};

  return (
    <Button block primary onClick={() => setVisible((v) => !v)}>
      Connect Wallet
    </Button>
  );
}
