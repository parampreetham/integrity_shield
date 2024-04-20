"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "@styles/loginSignup.css"





export default function ManufacturerLoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        sCode: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/SellerLogin", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("Seller");
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.sCode.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div>
        <div className="text-center text-3xl mt-10">
        <h1>{loading ? "Processing" : "Seller Login"}</h1>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 login">
        
        
        <label htmlFor="sCode">Seller Code</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="sCode"
            type="text"
            value={user.sCode}
            onChange={(e) => setUser({...user, sCode: e.target.value})}
            placeholder="Seller Code"
            />
        <label htmlFor="password">Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <Link href='/SellerForgotPassword' className="mb-3">ForgotPassword? 
            </Link>
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No login" : "Login"}</button>
            
        </div>
    </div>
    )

}