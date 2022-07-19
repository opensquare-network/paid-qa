import Modal from "./Modal";
import Button from "./Button";
import React from "react";

/**
 * @param {import('./types').ConnectWalletModalProps} props
 */
export default function ConnectWallet(props = {}) {
  return (
    <>
      <Button onClick={() => props?.setVisible?.(!props?.visible)} />
      <Modal {...props} />
    </>
  );
}

export { Modal as ConnectWalletModal, Button as ConnectWalletButton };
