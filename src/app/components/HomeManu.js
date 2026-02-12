"use client"
import React from 'react'
import Image from 'next/image'
import SectionHeader from './SectionHeader'
import { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
const HomeManu = () => {

  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    fetch('/api/menuitems').then((response) => {
      response.json().then((data) => {
        setBestSellers(data.slice(-4));
        console.log(data);
      });
    })
  }, [])


  return (
    <section >
      <div className='relative'>
        <div className='absolute left-[-16] top-[-55px] z-[-5]'>
          <Image src={"/sallad1.png"} width={110} height={110} alt='pizza'></Image>
        </div>

        <div className='absolute right-[-16] bottom-[-12px] z-[-5]'>
          <Image src={"/sallad2.png"} width={110} height={110} alt='pizza'></Image>
        </div>

        <div className='text-center'>
          <SectionHeader subhader={"check out"} mainhader={"Manu"} />
        </div>
      </div>

      <div className='allmanu grid md:grid-cols-4 grid-cols-2 gap-3 mt-5'>
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item} />
        ))}
      </div>

    </section>
  )
}

export default HomeManu
