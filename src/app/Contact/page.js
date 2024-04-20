import React from 'react'
import Image from 'next/image'

function ContactPage() {
    return (
        <div >
            <div>
                <h1 className='text-center text-xl font-blod mt-3'>Project Guide</h1>
                <div className="flex w-80 m-auto flex-between mt-2 bg-blue-100 rounded-md shadow-lg p-3">
                    <Image className=''
                        src="/assets/images/user_icon.png"
                        alt="guide_image"
                        width={100}
                        height={100} />
                    <div className='text-center'>
                        <h2 className='text-xl font-bold'>Ms. Sushmitha S.</h2>
                        <p>Assistent Professor<br />
                            Dept. of CSE<br />
                            DSATM, Bengaluru</p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-center text-xl folt-bold mt-3'>Project Members</h1>
                <div className="flex flex-wrap flex-between mt-6 justify-center text-center w-1/2 m-auto">
                    <div className="bg-blue-100 rounded-md shadow-lg p-3 w-80 mb-4">
                        <Image className='block m-auto'
                            src="/assets/images/user_icon.png"
                            alt="profile_image"
                            width={80}
                            height={80} />
                        <h2>Param Preetham R</h2>
                        <p>1DT20CS091<br />
                            Dept. of CSE<br />
                            DSATM, Bengaluru</p>
                    </div>
                    <div className="bg-blue-100 rounded-md shadow-lg p-3 w-80 mb-4">
                        <Image className='block m-auto'
                            src="/assets/images/user_icon.png"
                            alt="profile_image"
                            width={80}
                            height={80} />
                        <h2>Raghavendra R Bavagi</h2>
                        <p>1DT20CS105<br />
                            Dept. of CSE<br />
                            DSATM, Bengaluru</p>
                    </div>
                    <div className="bg-blue-100 rounded-md shadow-lg p-3 w-80 mb-4">
                        <Image className='block m-auto'
                            src="/assets/images/user_icon.png"
                            alt="profile_image"
                            width={80}
                            height={80} />
                        <h2>Kshitija</h2>
                        <p>1DT20CS070<br />
                            Dept. of CSE<br />
                            DSATM, Bengaluru</p>
                    </div>
                    <div className="bg-blue-100 rounded-md shadow-lg p-3 w-80 mb-4">
                        <Image className='block m-auto'
                            src="/assets/images/user_icon.png"
                            alt="profile_image"
                            width={80}
                            height={80} />
                        <h2>Nagareddy G. B.</h2>
                        <p>1DT20CS091<br />
                            Dept. of CSE<br />
                            DSATM, Bengaluru</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactPage
