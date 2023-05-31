import { secp256k1 } from "ethereum-cryptography/secp256k1";
function createStringifiedSignature(message, privateKey) {
  try {
    const signature = secp256k1.sign(message, privateKey);
    return JSON.stringify({
      ...signature,
      r: signature.r.toString(),
      s: signature.s.toString(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
export default createStringifiedSignature;
