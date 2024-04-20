'use client'
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Replace with your contract ABI file path
import '@styles/manufacturerPage.css';
import axios from "axios";

function AddSeller({ params }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [user, setUser] = useState({
    mId: `${params.mId}`,
    name: "",
    email:"",
    phoneNumber: "",
    brand: "",
    manager: "",
    sCode: "",
    address: "",
    password: "",
  })

  function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
  useEffect(() => {
    const randomStr = generatePassword(8);
    setUser({ ...user, password: randomStr })
  }, []);

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
      console.log('Manufacturer ID:', user.mId);
      console.log('Seller Name:', user.name);
      console.log('Seller Brand:', user.brand);
      console.log('Seller Code:', user.sCode);

      const accounts = await web3.eth.getAccounts();
      const fromAddress = accounts[0];

      console.log(user);
      const response = await axios.post("/api/users/SellerSignup", user);
      console.log("Signup success", response.data);


      // Convert user input to bytes32 (adjust conversion methods as needed)

      const convertedManufacturerId = web3.utils.padLeft(web3.utils.utf8ToHex(user.mId), 64);
      const convertedSellerName = web3.utils.padLeft(web3.utils.utf8ToHex(user.name), 64);
      const convertedSellerBrand = web3.utils.padLeft(web3.utils.utf8ToHex(user.brand), 64);
      const convertedSellerCode = web3.utils.padLeft(web3.utils.utf8ToHex(user.sCode), 64);
      const convertedSellerManager = web3.utils.padLeft(web3.utils.utf8ToHex(user.manager), 64);
      const convertedSellerAddress = web3.utils.padLeft(web3.utils.utf8ToHex(user.address), 64);

      await contract.methods
        .addSeller(convertedManufacturerId, convertedSellerName, convertedSellerBrand, convertedSellerCode, user.phoneNumber, convertedSellerManager, convertedSellerAddress)
        .send({ from: fromAddress });

      console.log('Transaction successful!');

      // Clear form fields after successful submission
      setUser({ ...user, name: "",email:"", phoneNumber: "", brand: "", manager: "", sCode: "", address: "" });
    } catch (error) {
      console.error('Error adding seller:', error);
    }
  };
  return (
    <div>
      <h2 className='text-center mt-2 mb-4 text-2xl'>Add Seller</h2>
      <form onSubmit={handleSubmit} className='addSellerform'>

        <div className='flex'>
          <div className='w-1/2 mr-5'>
          <label>Manufacturer ID:</label><br />
          <input type="text" value={params.mId} disabled />
          <label>
              Seller Code:</label><br />
            <input type="text" value={user.sCode} onChange={(e) => setUser({ ...user, sCode: e.target.value })} placeholder='Seller Code' />
            <br />
            <label>
              Seller Number:</label><br />
            <input type="number" value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} placeholder='Seller Number' />
            <label>
              Seller Brand:</label><br />
            <input type="text" value={user.brand} onChange={(e) => setUser({ ...user, brand: e.target.value })} placeholder='Seller Brand' />
            <br />
            
          </div>
          <div className='w-1/2 mr-5'>
          <label>
              Seller Name:</label><br />
            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder='Seller Name' />
            <label>
              Seller Email:</label><br />
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Seller Email' />
            <br />
            <label>
              Seller Manager:</label><br />
            <input type="text" value={user.manager} onChange={(e) => setUser({ ...user, manager: e.target.value })} placeholder='Seller Manager' />
            <br />
            <label>
              Seller Address:</label><br />
            <input type="text" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} placeholder='Seller Address' />
            <br />
          </div>
        </div>
        <button type='submit' className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Seller</button>
      </form>
    </div>
  );
}

export default AddSeller;
