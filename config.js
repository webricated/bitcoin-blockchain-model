const cryptoHash = require("./crypto-hash");
const GENESIS_DATA={
    timestamp: 1,
    prevHash: '0x000',
    hash: cryptoHash("1", "0x000"),
    data:[]
}

module.exports = {GENESIS_DATA};