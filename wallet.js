const ethers = require('ethers');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

const wallet = ethers.Wallet.fromMnemonic(mnemonic);
console.log(wallet)