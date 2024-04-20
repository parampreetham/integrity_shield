"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Assuming you have the JSON ABI of your contract

const PurchaseHistory = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [consumerCode, setConsumerCode] = useState('');
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      let web3Instance = null;
      if (window.ethereum) {
        web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error('User denied account access');
        }
      } else if (window.web3) {
        web3Instance = new Web3(window.web3.currentProvider);
      } else {
        console.error('No web3 detected');
      }

      if (web3Instance) {
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ProductContract.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          ProductContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(contractInstance);
      }
    };

    initContract();
  }, [web3]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!contract || !account) return;

    try {
      const result = await contract.methods.getPurchaseHistory(web3.utils.padLeft(web3.utils.utf8ToHex(consumerCode), 64)).call({ from: account });
      if (!result || typeof result !== 'object') {
        console.log('No product history found for this consumer.');
        setProducts([]);
        return;
      }
  
      // Process the result and update products state
      const productSNs = result[0];
      const sellerCodes = result[1];
      const manufacturerCodes = result[2];
  
      // Check if any of the arrays are undefined or empty
      if (!productSNs || !sellerCodes || !manufacturerCodes || productSNs.length === 0) {
        console.log('No product history found for this consumer.');
        setProducts([]);
        return;
      }
  
      // Map the arrays into an array of formatted product objects
      const formattedProducts = productSNs.map((sn, index) => ({
        sn: web3.utils.hexToUtf8(sn).replace(/\0/g, ''),
        sellerCode: web3.utils.hexToUtf8(sellerCodes[index]).replace(/\0/g, ''),
        manufacturerCode: web3.utils.hexToUtf8(manufacturerCodes[index]).replace(/\0/g, ''),
      }));
  
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center mt-2 mb-4 text-2xl'>Product Purchase History</h2>
      <div className='text-center'>
      <form onSubmit={handleSearch}>
        <label className='text-xl'>
          Consumer ID:
          <input 
            type="text" 
            value={consumerCode} 
            onChange={(e) => setConsumerCode(e.target.value)} 
            placeholder="Enter consumer ID" 
            className='ml-3 p-2 border-black bg-slate-100 rounded'/>
        </label>
        <button type="submit" className='bg-green-400 p-2 rounded ml-3'>Search</button>
      </form>
      </div>
      

      {products.length > 0 ? (
        <div className='mt-5 block m-auto text-center ml-12 mr-12'>
          <div className='flex flex-between  mt-3 text-center align-middle bg-blue-300 p-2 rounded rounded-b-none'>
            <p className='w-44 font-bold'>SN</p>
            <p className='w-44 font-bold'>Manufacturer Code</p>
            <p className='w-44 font-bold'>Seller Code</p>
          </div>

          {products.map((product, index) => (
            <div key={index} className='flex justify-between items-center bg-blue-400 p-2 hover:bg-blue-200'>
              <p className='w-44 text-center'>{product.sn}</p>
              <p className='w-44 text-center'>{product.sellerCode}</p>
              <p className='w-44 text-center'>{product.manufacturerCode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center mt-10 text-xl'>No product found for this consumer.</p>
      )}
    </div>
  );
};

export default PurchaseHistory;
