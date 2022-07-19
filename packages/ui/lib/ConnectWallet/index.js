import Modal from "./Modal";
import Button from "./Button";
import React from "react";

export default function ConnectWallet(props = {}) {
  return (
    <>
      <Button onClick={() => props?.setVisible?.(!props?.visible)} />
      <Modal {...props} />
    </>
  );
}
