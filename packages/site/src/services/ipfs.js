import Hash from "ipfs-only-hash";

export async function cidOf(obj) {
  const data = JSON.stringify(obj);
  return await Hash.of(Buffer.from(data));
}
