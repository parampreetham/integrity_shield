"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import "@styles/manufacturerPage.css"
import Image from "next/image";

function Consumer() {
  return (
    <div>
      <div className="w-100 flex justify-center flex-wrap ml-30">
        <div className="mlinks">
          <Link href={'Consumer/VerifyProduct'}>
            <Image src='/assets/images/VerifyProduct.png'
              width={70}
              height={70} />
            Verify Product
          </Link>
        </div>
        <div className="mlinks">

          <Link href={'Consumer/PurchaseHistory'}>
            <Image src='/assets/images/PurchaseHistory.png'
              width={70}
              height={70} />
            Purchase History
          </Link>
        </div>

      </div>


    </div>
  )
}
export default Consumer
