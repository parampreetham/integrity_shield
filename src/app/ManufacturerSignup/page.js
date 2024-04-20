"use client";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function ManufacturerSignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        mId:"",
        name:"",
        email: "",
        phoneNumber:"",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/ManufacturerSignup", user);
            console.log("Signup success", response.data);
            router.push("/ManufacturerLogin");
            
        } catch (error) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.mId.length > 0 && user.email.length > 0 && user.password.length > 0 && user.name.length > 0 && user.phoneNumber.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="mId">Manufacturer ID</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="mId"
            type="text"
            value={user.mId}
            onChange={(e) => setUser({...user, mId: e.target.value})}
            placeholder="manufacturer ID"
            />
        <label htmlFor="name">Name</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="Name"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="phoneNumber"
            type="text"
            value={user.phoneNumber}
            onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
            placeholder="Phone Number"
            />
        
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/ManufacturerLogin">Visit login page</Link>
        </div>
    )

}