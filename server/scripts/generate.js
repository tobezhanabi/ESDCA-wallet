const { secp256k1 } = require("@noble/curves/secp256k1");

const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
console.log(`Private key: ${toHex(privateKey)}`);
console.log(`Public key: ${toHex(publicKey)}`);
