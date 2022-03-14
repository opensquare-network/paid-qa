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
  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await api.tx.system
        .remark(remark)
        .signAndSend(account.address, ({ events = [], status }) => {
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
        });
    } catch (e) {
      reject(e);
    }
  });
}
