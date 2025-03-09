const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const keccak256 = require("ethereum-cryptography/keccak.js").keccak256;
const secp256k1 = require("ethereum-cryptography/secp256k1").secp256k1;
const toHex = require("ethereum-cryptography/utils").toHex;

app.use(cors());
app.use(express.json());

const balances = {
  "02ee954e295758a4fbfb4b7c5720d011bd853dc6d794ddce3ac5e4ee15b8d416d6": 100,
  "038b91a637ec4d5dd43928c10681ae583bbb430c8e9eaa0c9c8ad004aade964b95": 50,
  "03e905e1da384c287b496d7b81a919511db37e3957b0452295549d61052d41a553": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const transaction = req.body;
  console.log(transaction);
  const { sender, recipient, amount, hexSign } = transaction;
  const trxHash = GetTransactionHash(transaction);
  const isSigned = secp256k1.verify(hexSign, trxHash, sender);
  console.log("Is signed: ", isSigned);
  console.log("Transaction's hash: ", trxHash);
  if (isSigned){
    setInitialBalance(sender);
    setInitialBalance(recipient);
  
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else {
    res.status(400).send({ message: "Not signed!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function GetTransactionHash(transaction) {
  const sign = transaction.hexSign;
  transaction.hexSign = "";
  const hash = toHex(keccak256(Uint8Array.from(JSON.stringify(transaction))));
  transaction.hexSign = sign;
  return hash;
}
