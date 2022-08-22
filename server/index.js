// server/index.js

import express from "express";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3001;
const app = express();
const jsonParser = bodyParser.json()
import { Keypair, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { readFile, readdir } from 'fs/promises';
import { extname, basename } from 'node:path';

import {  getAccountsBaseDir, 
          getActiveConnection, 
          getAvailableConnections,
          setActiveConnection } from './db.js';
import { nextTick } from "process";

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server 2!" });
});

async function getActiveConnectionStr() {
  let availableConnections = await getAvailableConnections();
  let activeConnection = await getActiveConnection();

  return availableConnections[activeConnection];
}

// Account balance
// input: account
async function getBalance(accountName) {
  const baseDir = await getAccountsBaseDir();
  const accountFile = baseDir + "/" + accountName + ".json";
  console.log(accountFile);
  const data = await readFile(accountFile, (err, data) => {
      if (err) throw err;
  });

  let seed = JSON.parse(data);
  seed = Uint8Array.from(seed);
  let account = Keypair.fromSecretKey(seed);
  console.log(account.publicKey.toBase58());
  console.log(account.secretKey);

  const activeConnectionString = await getActiveConnectionStr();
  console.log(activeConnectionString);
  const connection = new Connection(activeConnectionString);

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

// List of all available accounts
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

// Get Available Connections
app.get("/api/connections", async (req, res) => {
  let availableConnections = await getAvailableConnections();
  let activeConnection = await getActiveConnection();
  res.json({availableConnections: availableConnections, active: activeConnection});
});

app.put("/api/connections/active", jsonParser, async (req, res, next) => {
  console.log(req.body);
  var index = parseInt(req.body.index);
  var value = req.body.value;
  // check if valid integer
  if (! Number.isInteger(index)) {
    console.log("Not an integer");
    return res.sendStatus(400);
  }
  // check if available connection is correct
  var availableConnections = await getAvailableConnections();
  if (index < 0 || index >= availableConnections.length) {
    console.log("Wrong index");
    return res.sendStatus(400);
  }

  if (availableConnections[index] !== value) {
    console.log("Wrong connection name");
    return res.sendStatus(400);
  }
  
  await setActiveConnection(index);
  console.log("Active connection set");
  res.send("Active connection set");
});

// main - start server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});