import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState(new Uint8Array());

  return (
    <div className="app">
      <Wallet
        address={address}
        setAddress={setAddress}
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
        setBalance={setBalance}
        privateKey={privateKey}
        address={address} />
    </div>
  );
}

export default App;
