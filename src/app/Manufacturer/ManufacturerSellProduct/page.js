'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Replace with your contract ABI file path
import '@styles/manufacturerPage.css';
import { Html5QrcodeScanner } from 'html5-qrcode';

function ManufacturerSellProduct() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [productSN, setProductSN] = useState('');
  const [sellerCode, setSellerCode] = useState('');

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
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = ProductContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          ProductContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        console.log('Contract instance:', contractInstance);
        setContract(contractInstance);
        setWeb3(web3Instance);
      }
    };

    initWeb3();
  }, []);

  const handleSellProduct = async (event) => {
    event.preventDefault();
    if (!contract) return;

    try {
      const convertedProductSN = web3.utils.padLeft(web3.utils.utf8ToHex(productSN), 64);
      const convertedSellerCode = web3.utils.padLeft(web3.utils.utf8ToHex(sellerCode), 64);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      console.log("product SN",convertedProductSN)
      console.log("seller code",convertedSellerCode)
      await contract.methods
        .manufacturerSellProduct(convertedProductSN, convertedSellerCode)
        .send({ from: address });

      console.log('Product assigned to seller successfully!');
      // Clear form fields or update UI after successful transaction
    } catch (error) {
      console.error('Error assigning product to seller:', error);
      // Handle errors and display appropriate messages
    }
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", { fps: 10, qrbox: 250});

    scanner.render(success, error)

    function success(result) {
      scanner.clear();
      setProductSN(result)
    }
    function error(error) {
      console.log(error)
    }
  }, [])


  return (
    <div>
      <h2 className='text-center mt-2 mb-4 text-2xl'>Sell Product to Seller</h2>
      <div id="reader" className='scanner'/>
      <form onSubmit={handleSellProduct}>
        <div className='sellProductForm'>
          <label>
            Product Serial Number:</label><br />
          <input type="text" value={productSN} disabled />

          <label>
            Seller Code:</label><br />
          <input type="text" value={sellerCode} onChange={(e) => setSellerCode(e.target.value)} placeholder="Enter seller code" />

          <button type="submit">Sell Product</button>
        </div>

      </form>
    </div>
  );
}

export default ManufacturerSellProduct;
