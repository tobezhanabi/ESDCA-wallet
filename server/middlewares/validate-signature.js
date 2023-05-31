const { secp256k1 } = require("ethereum-cryptography/secp256k1");

function validateSignature(req, res, next) {
  const { message, signature, publickey } = req.headers;
  if (!signature || !publickey) {
    return res.status(401).json({
      status: "unauthorized",
      message: "signature or address not found",
    });
  }
  const signatureParsed = JSON.parse(signature);
  try {
    const isSignatureValid = secp256k1.verify(
      {
        r: BigInt(signatureParsed.r),
        s: BigInt(signatureParsed.s),
      },
      message,
      publickey
    );
    if (!isSignatureValid) throw new Error("Invalid signature");
  } catch ({ message }) {
    return res.status(401).send({ message });
  }
  next();
}

module.exports = validateSignature;
