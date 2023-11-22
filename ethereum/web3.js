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
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Use the current account directly without calling eth_getAccounts
      const connectedAccount = window.ethereum.selectedAddress;
      if (connectedAccount) {
        console.log('Connected MetaMask account:', connectedAccount);
      } else {
        console.log('No MetaMask account connected');
      }
    } catch (error) {
      console.error('User denied account access:', error);
    }
  })();
} else {
  // Fallback to a different provider, e.g., local development or Alchemy
  const provider = new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/NjlALbrl8OyBHgN70kJL512S7v56qYpu'); // Update with your own provider
  web3 = new Web3(provider);
}

export default web3;
