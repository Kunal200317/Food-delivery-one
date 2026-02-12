"use client"
import React from 'react'
import Usertabs from '../components/Usertabs'
import { UseProfile } from '../components/UseProfile'
import Loading from '../components/loding'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'


const Menu_items = () => {
    const { loading: profileloading, data: profiledata } = UseProfile()
    const [MenuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch('/api/menuitems').then((response) =>
            response.json().then((data) =>
                setMenuItems(data)));
    }, [])


    if (profileloading) {
        return <Loading />
    }

    if (!profiledata.admin) return <div>You are not authorized to access this page.</div>





    return (
        <>
            <section>
                <Usertabs isAdmin={profiledata.admin} />
                <div className='border border-gray-400 text-center bg-gray-100 rounded-lg w-[40vw] mx-auto font-medium flex justify-center gap-2 items-center text-sm p-1'>
                    <Link href={"Menu_items/new"}>Create new menu</Link>
                    <img className='w-5' src="/Right.svg" alt="" />
                </div>

                <div className='w-[40vw] mx-auto my-2'>
                    <h1 className='underline text-xs text-gray-600'>Edit items</h1>
                </div>


                <div className="grid md:grid-cols-4 grid-cols-3 md:w-[42vw] mx-auto gap-1 gap-x-2 ">
                    {MenuItems.length === 0 && <div>There is no Menu</div>}
                    {MenuItems.length > 0 &&
                        MenuItems.map((item) => (
                            <Link
                                key={item._id}
                                href={`Menu_items/edit/${item._id}`}
                                className="border rounded-lg md:w-32 w-28 md:h-36 h-32 mx-auto font-medium text-sm p-1 flex flex-col items-center gap-1 bg-stone-300">

                                <div className="w-30 h-35 overflow-hidden rounded-md flex justify-center items-center bg-gray-200">
                                    <Image
                                        src={item.image && item.image.length > 0 ? item.image : "/pngegg.png"} // ✅ Fallback image
                                        width={100} // ✅ Matches container
                                        height={100}
                                        alt="Menu Item"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="text-center">{item.name}</span>
                            </Link>
                        ))}
                </div>


            </section>

        </>
    )
}

export default Menu_items
