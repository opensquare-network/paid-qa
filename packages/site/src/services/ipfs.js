import Hash from "ipfs-only-hash";

export function cidOf(obj) {
  const data = JSON.stringify(obj);
  const cid = await Hash.of(Buffer.from(data));
  return cid;
}
