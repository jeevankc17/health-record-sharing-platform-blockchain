import Web3 from 'web3';

let web3;

// Check if we are in the browser and MetaMask is running
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Use MetaMask provider
  web3 = new Web3(window.ethereum);
  
  // Request account access if needed
  (async () => {
    try {
      // Requesting account access
      await window.ethereum.enable();

      // Get the connected accounts
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const connectedAccount = accounts[0];
        console.log('Connected MetaMask account:', connectedAccount);
      } else {
        console.log('No MetaMask account connected');
      }
    } catch (error) {
      console.error('User denied account access:', error);
    }
  })();
} else {
  // Fallback to a different provider, e.g., local development or Infura
  const provider = new Web3.providers.HttpProvider('https://polygonzkevm-mainnet.g.alchemy.com/v2/JOmuhjrFpyrKKBXQd-CtHr2Lwv8OaC-q'); // Update with your own provider
  web3 = new Web3(provider);
}

export default web3;
