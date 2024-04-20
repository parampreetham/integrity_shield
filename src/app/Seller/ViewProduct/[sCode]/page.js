"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Assuming you have the JSON ABI of your contract

const QueryProductsList = ({ params }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [sellerCode, setSellerCode] = useState('');
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
      const result = await contract.methods.queryProductsList(web3.utils.padLeft(web3.utils.utf8ToHex(params.sCode), 64)).call({ from: account });

      // Process the result and update sellers state
      // Assuming result contains seller data in the format: [ids, names, brands, codes, nums, managers, addresses]
      console.log('Products:', result);
      const formattedProducts = result[0].map((id, index) => ({
        id,
        sn: web3.utils.toAscii(result[1][index]).replace(/\0/g, ''),
        name: web3.utils.hexToUtf8(result[2][index]).replace(/\0/g, ''),
        brand: web3.utils.hexToUtf8(result[3][index]).replace(/\0/g, ''),
        price: result[4][index],
        status: web3.utils.hexToUtf8(result[5][index]).replace(/\0/g, ''),
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center mt-2 mb-4 text-2xl'>View Products available for sell</h2>
      <div className='text-center'>
        <form onSubmit={handleSearch}>
          <label className='text-xl'>
            Seller ID:
            <input type="text" value={params.sCode} disabled className='ml-3 p-2 border-black bg-slate-100 rounded' />
          </label>
          <button type="submit" className='bg-green-400 p-2 rounded ml-3'>Search</button>
        </form>
      </div>


      {products.length > 0 ? (
        <div className='mt-5 block m-auto text-center ml-12 mr-12'>
          <div className='flex flex-between  mt-3 text-center align-middle bg-blue-300 p-2 rounded rounded-b-none'>
            <p className='w-44 font-bold'>Sl No</p>
            <p className='w-44 font-bold'>SN</p>
            <p className='w-44 font-bold'>Name</p>
            <p className='w-44 font-bold'>Brand</p>
            <p className='w-44 font-bold'>Price</p>
            <p className='w-44 font-bold'>Status</p>
          </div>

          {products.map((product, index) => (
            <div key={index} className='flex justify-between items-center bg-blue-400 p-2 hover:bg-blue-200'>
              <p className='w-44 text-center font-bold'>{Number(product.id)}</p>
              <p className='w-44 text-center'>{product.sn}</p>
              <p className='w-44 text-center'>{product.name}</p>
              <p className='w-44 text-center'>{product.brand}</p>
              <p className='w-44 text-center'>{Number(product.price)}</p>
              <p className='w-44 text-center'>{product.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center mt-10 text-xl'>No product found for this seller.</p>
      )}
    </div>
  );
};

export default QueryProductsList;
