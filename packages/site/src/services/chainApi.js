import {
  web3Enable,
  isWeb3Injected,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";
import { PROJECT_NAME } from "utils/constants";

export const signMessage = async (text, address) => {
  if (!isWeb3Injected) {
    throw new Error("Polkadot Extension is not installed");
  }

  if (!address) {
    throw new Error("Sign addres is missing");
  }

  await web3Enable(PROJECT_NAME);
  const injector = await web3FromAddress(address);

  const data = stringToHex(text);
  const result = await injector.signer.signRaw({
    type: "bytes",
    data,
    address,
  });

  return result.signature;
};

function extractBlockTime(extrinsics) {
  const setTimeExtrinsic = extrinsics.find(
    (ex) => ex.method.section === "timestamp" && ex.method.method === "set"
  );
  if (setTimeExtrinsic) {
    const { args } = setTimeExtrinsic.method.toJSON();
    return args.now;
  }
}

export async function submitRemark(api, remark, account, callback) {
  const tx = api.tx.system.remark(remark);
  const { blockHash, extrinsicIndex } = await signAndSendTx(
    tx,
    account,
    callback
  );
  const block = await api.rpc.chain.getBlock(blockHash);
  const blockHeight = block.block.header.number.toNumber();
  const blockTime = extractBlockTime(block.block.extrinsics);

  return {
    blockHash,
    extrinsicIndex,
    blockHeight,
    blockTime,
  };
}

export async function submitFund(api, remark, transfer, account, callback) {
  const txRemark = api.tx.system.remark(remark);
  const txTransfer =
    transfer.tokenIdentifier === "N"
      ? api.tx.balances.transfer(transfer.to, transfer.value)
      : api.tx.assets.transfer(
          transfer.tokenIdentifier,
          transfer.to,
          transfer.value
        );
  const txBatch = api.tx.utility.batch([txRemark, txTransfer]);
  return await signAndSendTx(txBatch, account, callback);
}

function signAndSendTx(tx, account, callback = () => {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const unsub = await tx.signAndSend(
        account.address,
        ({ events = [], status }) => {
          if (status.isInBlock) {
            unsub();

            callback("InBlock");

            events
              .filter(({ event: { section } }) => section === "system")
              .forEach(({ event: { method } }) => {
                if (method === "ExtrinsicFailed") {
                  callback(method);
                  reject(new Error(method));
                } else if (method === "ExtrinsicSuccess") {
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
          }
        }
      );
      callback("Broadcasting");
    } catch (e) {
      reject(e);
    }
  });
}
