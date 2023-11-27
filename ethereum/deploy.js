const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');

// Link to zkEVM network by using Alchemy and providing seed phrase of metamask wallet
const provider = new HDWalletProvider(
    'educate book bridge grace afford always know naive there best dance ticket',
    'https://eth-sepolia.g.alchemy.com/v2/NjlALbrl8OyBHgN70kJL512S7v56qYpu',
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);

        // Deploy contract to zkEVM network
        const result = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
            .deploy({ data: compiledRecord.bytecode })
            .send({ gas: '2000000', from: accounts[0] });  // Increase gas limit as needed

        // Display the address of the contract
        console.log('Contract deployed to', result.options.address);

        // Always go to record.js after updating solidity code
    } catch (error) {
        console.error('Deployment failed:', error);
    }
};

deploy();
