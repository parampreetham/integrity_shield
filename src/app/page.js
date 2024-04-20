import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="home">
        <Image className="image-zoom"
          src='/assets/images/shield.png'
          alt='logo'
          width={200}
          height={200}
        // className='object-contain'
        />
        <ul>
          <li>
            <Link href="ManufacturerLogin">Manufacturer</Link>
          </li>
          <li>
            <Link href="SellerLogin">Seller</Link>
          </li>
          <li>
            <Link href="Consumer">Consumer</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
