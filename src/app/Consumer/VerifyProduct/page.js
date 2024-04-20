"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ProductContract from '@contracts/product.json'; // Assuming you have the JSON ABI of your contract
import { Html5QrcodeScanner } from 'html5-qrcode';
import '@styles/manufacturerPage.css';
import Image from 'next/image';

const VerifyProduct = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [consumerCode, setConsumerCode] = useState('');
    const [productSN, setProductSN] = useState('');
    const [account, setAccount] = useState(null);
    const [productStatus, setProductStatus] = useState(null);
    const [displayStatus, setDisplayStatus] = useState(false);

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

        const paddedProductSN = web3.utils.padLeft(web3.utils.utf8ToHex(productSN), 64);
        const paddedConsumerCode = web3.utils.padLeft(web3.utils.utf8ToHex(consumerCode), 64);
        try {
            const result = await contract.methods.verifyProduct(paddedProductSN, paddedConsumerCode).call({ from: account });

            // Process the result and update sellers state
            // Assuming result contains seller data in the format: [ids, names, brands, codes, nums, managers, addresses]
            console.log('Products:', result);
            setDisplayStatus(true)
            setProductStatus(result ? 'Verified' : 'Not Verified');
            setConsumerCode("");
            setProductSN("");
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    };

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 });

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
            <h2 className='text-center mt-2 mb-4 text-2xl'>Verify Product</h2>
            <div id="reader" className='scanner' />
            <form onSubmit={handleSearch}>
                <div className='sellProductForm'>
                    <label>
                        Product Serial Number:</label><br />
                    <input type="text" value={productSN} disabled />

                    <label>
                        Consumer Code:</label><br />
                    <input type="text" value={consumerCode} onChange={(e) => setConsumerCode(e.target.value)} placeholder="Enter consumer code" />

                    <button type="submit">Verify Product</button>
                </div>

            </form>
            {displayStatus &&
                <h2 className='verification'>
                    {productStatus==='Verified' ? 
                    (<h2 >
                        <Image src='/assets/images/verified.png' 
                        alt='verified' 
                        height={100} 
                        width={100} />
                        &nbsp;This product is verified. 
                    </h2>) : 
                    (<h2>
                        <Image src='/assets/images/notVerified.png' 
                        alt='Not verified' 
                        height={100} 
                        width={100} />
                        &nbsp;This product is Not Verified.
                    </h2>)}
                </h2>
            }


        </div>
    );
};

export default VerifyProduct;
