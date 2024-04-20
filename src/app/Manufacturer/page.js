"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@styles/manufacturerPage.css"
import Image from "next/image";

function Manufacturer() {
  const router = useRouter()
  const [data, setData] = useState("Loading...")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/ManufacturerLogin')
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/manufacturer')
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
          height={100} 
          alt="Profile Photo"/>
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
          <Link href={`Manufacturer/AddProduct/${data.mId}`}>
            <Image src='/assets/images/product.png'
              width={70}
              height={70}
              alt="Add Product icon" />
            Add Product
          </Link>
        </div>
        <div className="mlinks">

          <Link href={`Manufacturer/AddSeller/${data.mId}`}>
            <Image src='/assets/images/seller.png'
              width={70}
              height={70} 
              alt="Add seller icon"/>
            Add Seller
          </Link>
        </div>
        <div className="mlinks">

          <Link href="Manufacturer/ManufacturerSellProduct">
            <Image src='/assets/images/sellProduct.png'
              width={70}
              height={70} 
              alt="View sold products icon"/>
            Sell Product to Seller
          </Link>
        </div>
        <div className="mlinks">

          <Link href={`Manufacturer/ViewSellersByManufacturer/${data.mId}`}>
            <Image src='/assets/images/viewSeller.png'
              width={70}
              height={70} 
              alt="View Seller icon"/>
            View Sellers
          </Link>
        </div>

      </div>


    </div>
  )
}
export default Manufacturer
