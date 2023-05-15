const crypto = require('crypto');

const cryptoHash = (...inputs)=>{           //passing ...inputs so that it can take any number of inputs like id, ip address, timestamp, previous hash, etc
    const hash = crypto.createHash('sha256')//we have numbers of cryptography algorithm so, I am passing a particular sha256 algorithm to generate hash
    hash.update(inputs.sort().join(""));    //sorting because in the case input is not coming in a manner then hash generated will be different and basically sort() function will arrange the inputs in alphabetical order and furthermore, to generate hash, I am using all the inputs so, the hex will depend on inputs
    return hash.digest("hex");              //to return the value in hexa decimal structure, here i am using digest function and passing hex
};

result = cryptoHash("hello", "world");
module.exports = cryptoHash;                //this function is used to make variable importable in any other files by using variable name, location and const function
// console.log(result);