"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Usertabs = ({isAdmin}) => {
    const pathname = usePathname()
     

  return (
     <div className='flex md:gap-12  gap-2 justify-center mb-8 mt-5'>
               <Link className={`bg-gray-300 md:px-4 md:py-2 px-3 md:text-base flex justify-center items-center  py-1 rounded-full text-xs font-medium ${pathname==="/profile"?"active":" " } `} href={"/profile"} >Profile</Link>
               {isAdmin && (
                <>
                <Link className={`bg-gray-300 md:px-4 md:py-2 px-3 md:text-base flex justify-center items-center  py-1 rounded-full text-xs font-medium ${pathname==="/categories"?"active":" " } `} href={"/categories"} >Categories</Link>
    
                <Link className={`bg-gray-300 md:px-4 md:py-2 px-3 md:text-base flex justify-center items-center  text-nowrap py-1 rounded-full text-xs font-medium ${pathname.includes('Menu_items')?"active":" " } `} href={"/Menu_items"} >Menu Items</Link>
    
                <Link className={`bg-gray-300 md:px-4 md:py-2 px-3 md:text-base flex justify-center items-center  py-1 rounded-full text-xs font-medium ${pathname.includes("/user")?"active":" " } `} href={"/user"} >Users</Link>
                </>
               )}
               <Link className={`bg-gray-300 md:px-4 md:py-2 px-3 md:text-base flex justify-center items-center  py-1 rounded-full text-xs font-medium ${pathname==="/order"?"active":" " } `} href={"/order"} >Orders</Link>
    </div>
  )
}

export default Usertabs
