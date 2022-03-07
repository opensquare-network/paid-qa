import Hash from "ipfs-only-hash";
import { Buffer } from "buffer";

export async function cidOf(obj) {
  const data = JSON.stringify(obj);
  return await Hash.of(Buffer.from(data));
}
