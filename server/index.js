// server/index.js

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs/promises');
const path = require('node:path');

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server 2!" });
  });


async function getBalance(accountName) {
  const data = await fs.readFile("/home/dafe/.solana-devel/" + accountName + ".json", (err, data) => {
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

app.get("/api/account/balance", async (req, res) => {
    let balance = await getBalance(req.query.account);
    var account = {};
    account.name = req.query.account;
    account.balance = balance;
    res.json(account);
});

async function getAccounts() {

  try {
    files = await fs.readdir('/home/dafe/.solana-devel');
  } catch (err) {
    console.log(err);
  }

  var accounts = [];
  files.forEach(file => {
    if (path.extname(file) == ".json") {
      var filename = path.basename(file);
      accounts.push(filename.replace(/\.json$/, ""));
    }
  });

  console.log(accounts); 
  return accounts;
}


app.get("/api/accounts", async (req, res) => {
  let accounts = await getAccounts();
  res.json(accounts);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});