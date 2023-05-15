const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {                       
    constructor() {              // constructor provide some necessary feature which later I have used one of the important one is length
        this.chain = [Block.genesis()];  // creating chain in the form of array and passing first block that is genesis block
    }

    addBlock({ data }) {                 //adding block of data
        const newBlock = Block.mineBlock({    // the block which is being added will be new block and it will be needded to mine first
            prevBlock: this.chain[this.chain.length - 1], // giving details of mineBlock that it will have preBlock and prevBlock index will be the new index - 1
            data,                                      // it will also include data
        });
        this.chain.push(newBlock);                    // after new block has mined we need to push it to the chain
    }

    

    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {  //JSON.stringify is a feature that allows to compare two objects of different instances if the property is similar
            return false;                                     // if chain index 0 is not a genesis block then it is not a valid chain
        }
        for (let i = 1; i<chain.length; i++){     // now upcoming block may have issues, so that I am starting validation process from after genesis blick that block1 because I already had checked genesis block above
            const {timestamp,prevHash,hash,data} = chain[i]; //to validate, we need timestamp, prevHash, Hash and data which we can get from chain.
            const realLastHash = chain[i-1].hash;           // just giving a name to the hash of (i-1) which is calculated by timestamp, data, and prevHash already

            if(prevHash!==realLastHash) return false;      //if the prevHah of new block is not equal to the hash of realLastHash then validation failed

            const validatedHash = cryptoHash(timestamp, prevHash, data);  //to validate hash using cryptohash which includes timastamp, prevHash, data
            if(hash!==validatedHash) return false;       //if new block hash is not equal to the validated hash that is all above conditions inside for loop then validation failed
        }
        return true;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "Block1" });
const result = Blockchain.isValidChain(blockchain.chain);
console.log(blockchain.chain);
console.log(result);
module.exports = Blockchain;