"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import '@styles/manufacturerPage.css';


function AddManufacturer() {
    const router = useRouter();
    const [user, setUser] = useState({
        mId: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


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
        setUser({ ...user, password: randomStr });
    }, []);
    const onSignup = async () => {
        try {
            setLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/ManufacturerSignup", user);
            console.log("Signup success", response.data);
            toast.success("Manufacturer Added Successfully");

        } catch (error) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.mId.length > 0 && user.email.length > 0 && user.password.length > 0 && user.name.length > 0 && user.phoneNumber.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div>
            <Toaster />
            <h2 className='text-center mt-2 mb-4 text-2xl'>Add Manufacturer</h2>
            

                <div className='flex'>
                    <div className='w-2/3 mr-5 addManufacturerform'>
                        <label htmlFor="mId">
                            Manufacturer ID:</label><br />
                        <input
                            id="mId"
                            type="text"
                            value={user.mId}
                            onChange={(e) => setUser({ ...user, mId: e.target.value })}
                            placeholder='Manufacturer ID' />
                        <br />
                        <label htmlFor="name">
                            Name:</label><br />
                        <input
                            id="name"
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Name" />
                        <label htmlFor="email">
                            Email:</label><br />
                        <input
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="email" />
                        <br />

                        
                        <label htmlFor="phoneNumber">
                            Number:</label><br />
                        <input
                            id="phoneNumber"
                            type="text"
                            value={user.phoneNumber}
                            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                            placeholder="Phone Number"
                        />
                        <button
                            onClick={onSignup}
                            className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                            Add Manufacturer
                        </button>
                    </div>
                </div>

            
        </div>
    )
}

export default AddManufacturer
