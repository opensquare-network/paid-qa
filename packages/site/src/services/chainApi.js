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
