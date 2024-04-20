"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@styles/manufacturerPage.css"
import Image from "next/image";

function AdminDashboard() {
    const router = useRouter()
    const [data, setData] = useState("Loading...")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/Admin/Login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/admin')
        console.log(res.data);
        setData(res.data.data)
      }
    
      useEffect(() => {
        getUserDetails()
      }, [])
    return (
        <div className="flex">
            
            <div className="bg-blue-300 w-1/5 sidebar" >
            <h1 className="text-center text-xl font-bold">Admin Dashboard</h1>
                <Image className="m-auto mt-20"
                    src='/assets/images/user_icon.png'
                    width={100}
                    height={100}
                    alt="Profile Photo" />
                <h2 className="text-center mb-10">
                    Name: {data.name}<br />
                </h2>
                <button
                    onClick={logout}
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-auto">
                    Logout
                </button>
            </div>
            <div className="flex justify-center flex-wrap w-4/5 ml-60">
                <div className="mlinks">

                    <Link href="AddManufacturer">
                        <Image src='/assets/images/seller.png'
                            width={70}
                            height={70}
                            alt="Add manufacturer icon" />
                        Add Manufacturer
                    </Link>
                </div>

                <div className="mlinks">

                    <Link href="ViewManufacturer">
                        <Image src='/assets/images/viewSeller.png'
                            width={70}
                            height={70}
                            alt="View manufacturer icon" />
                        View Manufacturer
                    </Link>
                </div>

            </div>


        </div>
    )
}

export default AdminDashboard