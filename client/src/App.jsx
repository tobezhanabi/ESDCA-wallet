import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import React, { useState } from "react";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const message = toHex(keccak256(utf8ToBytes("alchemy")));

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        message={message}
      />
      <Transfer
        setBalance={setBalance}
        privateKey={privateKey}
        message={message}
        address={address}
      />
    </div>
  );
}

export default App;
