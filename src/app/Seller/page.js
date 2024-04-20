"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@styles/manufacturerPage.css"
import Image from "next/image";
import SellProduct from "./SellProduct/page";

function Seller() {
  const router = useRouter()
  const [data, setData] = useState("Loading...")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/SellerLogin')
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/seller')
    console.log(res.data);
    setData(res.data.data)
  }

  useEffect(() => {
    getUserDetails()
  }, [])


  return (
    <div>
      <div className="bg-blue-300 w-60 sidebar" >
        <Image className="m-auto mt-20"
          src='/assets/images/user_icon.png'
          width={100}
          height={100} />
        <h2 className="text-center mb-10">
          Name: {data.name}<br />
          Manufacturer ID: {data.mId}
        </h2>
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block m-auto">Logout</button>

      </div>
      <div className="w-100 flex justify-center flex-wrap ml-40">
        <div className="mlinks">
          <Link href={'Seller/SellProduct'}>
            <Image src='/assets/images/sellProduct.png'
              width={70}
              height={70} />
            Sell Product 
          </Link>
        </div>
        <div className="mlinks">

          <Link href={`Seller/ViewProduct/${data.sCode}`}>
            <Image src='/assets/images/viewSeller.png'
              width={70}
              height={70} />
            View Products
          </Link>
        </div>
        

      </div>


    </div>
  )
}
export default Seller
