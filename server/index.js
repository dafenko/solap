// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs/promises');

async function getBalance() {
  const data = await fs.readFile("/home/dafe/.solana-devel/solana-devel-account.json", (err, data) => {
      if (err) throw err;
  });

  let seed = JSON.parse(data);
  seed = Uint8Array.from(seed);
  let account = solanaWeb3.Keypair.fromSecretKey(seed);
  console.log(account.publicKey.toBase58());
  console.log(account.secretKey);

  const connection = new solanaWeb3.Connection("https://api.mainnet-beta.solana.com");

  let balance = await connection.getBalance(account.publicKey);
  balance = balance / solanaWeb3.LAMPORTS_PER_SOL;
  console.log(`${balance} SOL`);

  return balance;
}

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server 2!" });
  });

app.get("/api/account/balance", async (req, res) => {
    let balance = await getBalance();
    var account = {};
    account.name = "ucet";
    account.balance = balance;
    res.json(account);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});