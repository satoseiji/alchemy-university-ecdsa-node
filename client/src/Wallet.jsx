import server from "./server";
import { getPublicKey } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils"
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey }) {
  const [publicKey, setPublicKey] = useState(new Uint8Array());

  async function onChange(evt) {
    const privateKey = evt.target.value.toString();
    const publicKey = getPublicKey(privateKey);
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));

    setPublicKey(publicKey)
    setAddress(address)
    setPrivateKey(privateKey)

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key (for signing purposes)
        <input placeholder="Type your private key" onChange={onChange}></input>
      </label>

      <label>
        Public key (read only)
        <input type="text" readOnly value={toHex(publicKey)} />
      </label>

      <label>
        Address (read only)
        <input type="text" readOnly value={address} />
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
