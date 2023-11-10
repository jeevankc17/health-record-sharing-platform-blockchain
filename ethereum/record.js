import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
    JSON.parse(Record.interface),
    '0xf4Cd6EA7179bC5900df400374452D812c200D757' //Deployed Contract Code //Everytime contract code is changed and compiled, need to update this
);

export default instance;

//Whenever there is a change in Solidity code, use this few commands
//Step 1: cd ethereum
//Step 2: node compile.js
//Step 3: node deploy.js
//Step 4: Paste the contract deployed address above
//0xf4Cd6EA7179bC5900df400374452D812c200D757  deployed by zkevm testnet
//0xeC6C6E7F3EBd78dAF153DC450e9D135DEa744c7b  deployed by sepolia testnet