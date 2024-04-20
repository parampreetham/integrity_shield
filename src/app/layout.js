import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "../app/components/Nav"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Intergrity Shield",
  description: "Defending Genuine Goods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
