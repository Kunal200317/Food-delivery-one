"use client"
import React from 'react';
import Hero from './components/Hero';
import HomeManu from './components/HomeManu';
import SectionHeader from './components/SectionHeader';
import Link from 'next/link';

export default function Home() {
 
  return (
  <>
   <Hero/>
   <HomeManu/> 

   <section className='text-center my-5 ' id='about'>
       <SectionHeader subhader={"our story"} mainhader={"About us"} />

       <div className='w-2/3 mx-auto'>
         <p className='text-gray-500 text-sm mt-3 font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim ac felis fermentum laoreet. Sed posuere, dolor id sagittis faucibus, lectus velit semper lectus, vel sagittis nunc velit eu lectus. Sed viverra, nunc non ullamcorper consectetur, justo nunc rutrum velit, id condimentum ipsum urna id lectus. Donec vel velit non turpis ultricies consequat.</p>
         <p className='text-gray-500 text-sm mt-3 font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim ac felis fermentum laoreet. Sed posuere, dolor id sagittis faucibus, lectus velit semper lectus, vel sagittis nunc velit eu lectus. Sed viverra, nunc non ullamcorper consectetur, justo nunc rutrum velit, id condimentum ipsum urna id lectus. Donec vel velit non turpis ultricies consequat.</p>
         <p className='text-gray-500 text-sm mt-3 font-medium'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim ac felis fermentum laoreet. Sed posuere, dolor id sagittis faucibus, lectus velit semper lectus, vel sagittis nunc velit eu lectus. Sed viverra, nunc non ullamcorper consectetur, justo nunc rutrum velit, id condimentum ipsum urna id lectus. Donec vel velit non turpis ultricies consequat.</p>
       </div>
      
   </section>
     
     
     <section className='text-center ' id='contact'>
      <SectionHeader subhader={"don't/hesitate"} mainhader={"Contact us"} />  
      <Link className='text-2xl font-medium text-gray-600' href={"tel:+917050410627"}>+917050410627</Link>   
     </section>
      
  </>
  );
  
}

