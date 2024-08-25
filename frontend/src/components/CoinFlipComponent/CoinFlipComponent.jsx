import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

// Replace with your actual contract ABI (JSON data)
const abi = [
  // ... your contract ABI here
];

const CoinFlip = () => {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState('heads');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Check for MetaMask and request accounts on button click
  const requestAccounts = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);   

      } catch   
 (error) {
        console.error("Error requesting accounts", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Initialize Web3 provider and contract instance
  const initWeb3 = async () => {
    await requestAccounts(); // Ensure accounts are connected before proceeding

    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const signer = provider.getSigner();
      const coinFlipContract = new ethers.Contract(contractAddress, abi, signer);
      setContract(coinFlipContract);
    }
  };

  // Flip the coin function with error handling and result update
  const flipCoin = async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const tx = await contract.flipCoin(side === 'heads', { value: ethers.utils.parseEther(amount) });
      await tx.wait();
      setResult('Transaction successful!');

      // Save game result to the backend (optional)
      await axios.post(`${import.meta.env.VITE_API_URI}/api/game/save-result`, {
        playerAddress: account,
        amount,
        side,
        result
      });
    } catch (error) {
      console.error(error);
      setResult('Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <button
        onClick={requestAccounts}
        className="w-full py-3 px-4 mb-4 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
      >
        Connect Wallet
      </button>

      {account && (
        <p className="text-lg font-semibold mb-4 text-gray-700">
          Connected Account: <span className="text-blue-500">{account}</span>
        </p>
      )}

      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to bet (ETH)" // Specify currency
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"   

        />
      </div>

      <div className="mb-4">
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </div>

      <button
        onClick={flipCoin}
        disabled={loading}
        className={`w-full py-3 px-4 text-white rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'}`}
      >
        {loading ? 'Flipping...' : 'Flip Coin'}
      </button>

      {result && (
        <p className="mt-4 text-lg font-semibold text-gray-700">
          {result}
        </p>
      )}
    </div>
  );
};

export default CoinFlip;
