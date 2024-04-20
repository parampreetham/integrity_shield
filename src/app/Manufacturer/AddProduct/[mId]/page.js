'use client'
import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json';
import '@styles/manufacturerPage.css';
import QRCode from 'qrcode';
import bytes32 from 'bytes32';

function AddProduct({ params }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [manufacturerID, setManufacturerID] = useState(`${params.mId}`);
  const [productName, setProductName] = useState('');
  const [productSN, setProductSN] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [displayQr, setDisplayQr] = useState(false);
  const [qrData, setQrData] = useState('qrcode');
  const [qr, setQr] = useState('');
  const bytes32 =require('bytes32')


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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!contract) return;

    try {

      console.log('Manufacturer ID:', manufacturerID);
      console.log('Product Name:', productName);
      console.log('Product SN:', productSN);
      console.log('Product Brand:', productBrand);
      const accounts = await web3.eth.getAccounts(); // Fetch accounts from MetaMask
      const fromAddress = accounts[0]; // Use the first account as sender address

      // Pad manufacturer ID and product details to ensure 32 bytes (optional, adjust padding length if needed)
      const paddedManufacturerID = web3.utils.padLeft(web3.utils.utf8ToHex(manufacturerID), 64);
      const paddedProductName = web3.utils.padLeft(web3.utils.utf8ToHex(productName), 64);
      const paddedProductSN = web3.utils.padLeft(web3.utils.utf8ToHex(productSN), 64);
      const paddedProductBrand = web3.utils.padLeft(web3.utils.utf8ToHex(productBrand), 64);
      await contract.methods.addProduct(
        paddedManufacturerID,
        paddedProductName,
        paddedProductSN,
        paddedProductBrand,
        productPrice
      ).send({ from: fromAddress }); // Use fetched address as sender
      console.log("ManufacturerID",paddedManufacturerID)
      console.log("ProductName",paddedProductName)
      console.log("ProductSN",paddedProductSN)
      console.log("ProductBrand",paddedProductBrand)
      console.log('Manufacturer ID:', web3.utils.toAscii(paddedManufacturerID));
      console.log('Transaction successful!');


      setDisplayQr(true);
      setQrData(productSN);
      setManufacturerID('');
      setProductName('');
      setProductSN('');
      setProductBrand('');
      setProductPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: "#0f0f0f",
        light: "#ffffff"
      },
    },
      (err, qrData) => {
        if (err) return console.error(err);
        console.log(qrData);
        setQr(qrData);
      }
    );
  };

  useEffect(()  => {
      GenerateQRCode();
  }, [qrData]);

  const downloadQRCode = () => {
    if (!qrData) return;
    const link = document.createElement('a');
    link.download = 'product_qr_code.png';
    link.href = qr;
    link.click();
  };
  return (
    <div>
      <h2 className='text-center mt-2 text-2xl'>Add Product</h2>
      <div className='flex'>
      <form onSubmit={handleSubmit} className='addProductform'>
        <label>Manufacturer ID:</label>
        <input type="text" value={params.mId} disabled /><br />
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
        <label>Product SN:</label>
        <input type="text" value={productSN} onChange={(e) => setProductSN(e.target.value)} placeholder="Product SN" /><br />
        <label>Product Brand:</label>
        <input type="text" value={productBrand} onChange={(e) => setProductBrand(e.target.value)} placeholder="Product Brand" />
        <label>Product Price:</label>
        <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Product Price" /><br />
        <button type="submit">Add Product</button>
      </form>
      {displayQr && (
        <div className='qr-code  bg-slate-600'>
          <img src={qr} />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
      </div>
      
    </div>
  );
}

export default AddProduct;