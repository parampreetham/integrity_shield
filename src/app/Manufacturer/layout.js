import { Inter } from "next/font/google";
import "@styles/globals.css";
import ManufacturerData from "@app/components/ManufacturerData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intergrity Shield",
  description: "Defending Genuine Goods",
};

export default function Layout({ children }) {
  return (
    //   <body className={inter.className}>
    //     <ManufacturerData/>
    //     {children}
    //   </body>
      <section>
        {/* <ManufacturerData/> */}
        {children}</section>
  );
}
