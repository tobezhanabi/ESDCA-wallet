const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const validateSignature = require("./middlewares/validate-signature");

app.use(cors());
app.use(express.json());

const balances = {
  "031a7fe6aabde0065afe215e0261be8804267628e2e986142d22ff0891fb4fb0b": 100,
  "027e6b49ad30dbcd805a12f49a5f42d417d937ba691b3cba2bf6e58729fe3d8d41": 50,
  //"8d2ebc3bbb1b87d4952c347cd6cf419a0fed6ecaff371a3d7089d27d6199711d": 75,
};

app.get("/balance", validateSignature, (req, res) => {
  const { publickey } = req.headers;

  const balance = balances[publickey] || 0;
  res.send({ balance });
});

app.post("/send", validateSignature, (req, res) => {
  const { publickey } = req.headers;
  const { recipient, amount } = req.body;

  setInitialBalance(publickey);
  setInitialBalance(recipient);

  if (balances[publickey] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[publickey] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[publickey] });
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
