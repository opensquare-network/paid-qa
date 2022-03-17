import {
  web3Enable,
  isWeb3Injected,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";

export const signMessage = async (text, address) => {
  if (!isWeb3Injected) {
    throw new Error("Polkadot Extension is not installed");
  }

  if (!address) {
    throw new Error("Sign addres is missing");
  }

  await web3Enable("paidQA");
  const injector = await web3FromAddress(address);

  const data = stringToHex(text);
  const result = await injector.signer.signRaw({
    type: "bytes",
    data,
    address,
  });

  return result.signature;
};

export async function submitRemark(api, remark, account) {
  const tx = api.tx.system.remark(remark);
  return await signAndSendTx(tx, account);
}

export async function submitFund(api, remark, transfer, account) {
  const txRemark = api.tx.system.remark(remark);
  const txTransfer = transfer.tokenIdentifier === "N"
    ? api.tx.balances.transfer(transfer.to, transfer.value)
    : api.tx.assets.transfer(
        transfer.tokenIdentifier,
        transfer.to,
        transfer.value
      );
  const txBatch = api.tx.utility.batch([txRemark, txTransfer]);
  return await signAndSendTx(txBatch, account);
}

function signAndSendTx(tx, account) {
  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await tx.signAndSend(
        account.address,
        ({ events = [], status }) => {
          if (status.isInBlock) {
            unsub();

            const extrinsicIndex = JSON.parse(
              events[0]?.phase?.toString()
            )?.applyExtrinsic;
            const blockHash = status.asInBlock.toString();
            resolve({
              blockHash,
              extrinsicIndex,
            });
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
