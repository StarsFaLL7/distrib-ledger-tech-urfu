import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak.js"
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils"

function Transfer({ address, setBalance, privateKey, setPrivateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const transaction = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient: recipient,
      timestamp: Date.now(),
      hexSign: ""
    }
    const trxHashBytes = keccak256(Uint8Array.from(JSON.stringify(transaction)));
    const signature = secp.secp256k1.sign(trxHashBytes, privateKey);
    transaction.hexSign = signature.toCompactHex();
    console.log("trx: ", transaction);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
