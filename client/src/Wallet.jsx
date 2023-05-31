import server from "./server";
import React from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import createStringifiedSignature from "./utils/create-signature";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  message,
}) {
  async function onChange(evt) {
    let address;
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    try {
      address = toHex(secp256k1.getPublicKey(privateKey));
      const signature = createStringifiedSignature(message, privateKey);
      setAddress(address);

      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance`, {
          headers: { message, signature, publickey: address },
        });
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      setAddress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div> Your public address : {address.slice(-20, address.length)}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
