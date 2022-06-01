// server/index.js

import express from "express";
const PORT = process.env.PORT || 3001;
const app = express();
import { Keypair, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { readFile, readdir } from 'fs/promises';
import { extname, basename } from 'node:path';
import { getAccountsBaseDir } from './db.js';

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server 2!" });
});

async function getBalance(accountName) {
  const baseDir = getAccountsBaseDir();
  const data = await readFile(baseDir + accountName + ".json", (err, data) => {
      if (err) throw err;
  });

  let seed = JSON.parse(data);
  seed = Uint8Array.from(seed);
  let account = Keypair.fromSecretKey(seed);
  console.log(account.publicKey.toBase58());
  console.log(account.secretKey);

  const connection = new Connection("https://api.mainnet-beta.solana.com");

  let balance = await connection.getBalance(account.publicKey);
  balance = balance / LAMPORTS_PER_SOL;
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
  const baseDir = await getAccountsBaseDir();
  var accounts = [];

  try {
    var files = await readdir(baseDir);
    files.forEach(file => {
      if (extname(file) == ".json") {
        var filename = basename(file);
        accounts.push(filename.replace(/\.json$/, ""));
      }
    });
  } catch (err) {
    console.log(err);
  }

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