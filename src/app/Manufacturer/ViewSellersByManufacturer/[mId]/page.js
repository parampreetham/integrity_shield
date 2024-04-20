'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Assuming you have the JSON ABI of your contract
import '@styles/manufacturerPage.css';

const ViewSellersByManufacturer = ({ params }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      let web3Instance;
      if (window.ethereum) {
        web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error('User denied account access', error);
        }
      } else if (window.web3) {
        web3Instance = new Web3(window.web3.currentProvider);
      } else {
        console.error('No web3 detected');
      }
      setWeb3(web3Instance);

      if (web3Instance) {
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
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            ProductContract.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
        }
      }
    };

    initContract();
  }, [web3]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (contract && account) {
      try {
        const result = await contract.methods.querySellersList(web3.utils.padLeft(web3.utils.utf8ToHex(params.mId), 64)).call({ from: account });
        console.log('Sellers:', result);
        const formattedSellers = result[0].map((id, index) => ({
          id,
          name: web3.utils.hexToUtf8(result[1][index]).replace(/\0/g, ''),
          brand: web3.utils.hexToUtf8(result[2][index]).replace(/\0/g, ''),
          code: web3.utils.hexToUtf8(result[3][index]).replace(/\0/g, ''),
          num: result[4][index],
          manager: web3.utils.hexToUtf8(result[5][index]).replace(/\0/g, ''),
          address: web3.utils.hexToUtf8(result[6][index]).replace(/\0/g, ''),
        }));
        setSellers(formattedSellers);
      } catch (error) {
        console.error('Error fetching seller list:', error);
      }
    }
  };

  return (
    <div>
      <h2 className='text-center mt-2 mb-4 text-2xl'>Sellers</h2>
      <div className='text-center'>
        <form onSubmit={handleSearch}>
          <label className='text-xl'>
            Manufacturer ID:
            <input type="text" value={params.mId} disabled className='ml-3 p-2 border-black bg-slate-100 rounded' />
          </label>
          <button type="submit" className='bg-green-400 p-2 rounded ml-3'>Search</button>
        </form>
      </div>

      {sellers.length > 0 ? (
        <div className='mt-5 block m-auto text-center ml-12 mr-12'>
          <div className='flex flex-between  mt-3 text-center align-middle bg-blue-300 p-2 rounded rounded-b-none'>
          <p className='w-44 font-bold'>Sl No.</p>
          <p className='w-44 font-bold'>Name</p>
          <p className='w-44 font-bold'>Brand</p>
          <p className='w-44 font-bold'>Product Code</p>
          <p className='w-44 font-bold'>Ph No</p>
          <p className='w-44 font-bold'>Manager Name</p>
          <p className='w-44 font-bold'>Address</p>
        </div>

          {sellers.map((seller, index) => (
            <div key={index} className='flex justify-between items-center bg-blue-400 p-2 hover:bg-blue-200'>
              <p className='w-44 text-center font-bold'>{index + 1}</p>
              <p className='w-44 text-center'>{seller.name}</p>
              <p className='w-44 text-center'>{seller.brand}</p>
              <p className='w-44 text-center'>{seller.code}</p>
              <p className='w-44 text-center'>{Number(seller.num)}</p>
              <p className='w-44 text-center'>{seller.manager}</p>
              <p className='w-44 text-center'>{seller.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center mt-10 text-xl'>No sellers found for this manufacturer.</p>
      )}
    </div>
  );
};

export default ViewSellersByManufacturer;
