import Button from "../styled/Button";

export default function ConnectWalletButton({ setVisible = () => {} }) {
  return (
    <Button block primary onClick={() => setVisible((v) => !v)}>
      Connect Wallet
    </Button>
  );
}
