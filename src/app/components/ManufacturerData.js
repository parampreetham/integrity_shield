import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '@styles/nav.css'

function ManufacturerData() {
    return (
        <div>
            <nav className='flex-between w-full pt-2 pb-2 pl-5 pr-5'>
                <Link href='/' >
                    <Image
                        src='/assets/images/project logo.png'
                        alt='logo'
                        width={150}
                        height={30}
                        // className='object-contain'
                    />
                </Link>
                <div className='flex gap-2 flex-center links'>
                    <Link className='active' href='/'>Home</Link>
                    <Link href='/About'>logout</Link>
                    <Link href='/Contact'>Contact</Link>
                </div>
            </nav>
        </div>
    )
}

export default ManufacturerData
