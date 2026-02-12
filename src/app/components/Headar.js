'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { CartContext } from './SessionWrapper';

const Headar = () => {
  const [slide, setSlide] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { data: session, status } = useSession();
  const { cartProduct } = useContext(CartContext);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // avoid SSR mismatch

  let userName = session?.user?.name || session?.user?.email;
  if (userName?.includes(' ')) userName = userName.split(' ')[0];
  if (userName?.includes('@')) userName = userName.split('@')[0];

  return (
    <header>
      {/* Mobile */}
      <div className='md:hidden flex justify-between'>
        <Link className='md:text-3xl text-nowrap text-2xl text-primary font-bold' href="/">Pizza 47</Link>

        <div className='flex gap-3'>
          <div className='p-2'>
            <Link href='/cart' className='relative'>
              <img className='w-6' src="/cart.svg" alt="cart" />
              {cartProduct.length > 0 && (
                <span className='text-xs text-white absolute -top-1 -right-2 bg-primary px-[5px] py-[2px] rounded-full leading-3 font-medium'>
                  {cartProduct.length}
                </span>
              )}
            </Link>
          </div>
          <div onClick={() => setSlide(true)} className='p-1 rounded-md'>
            <img className='w-8' src="/hamburggar.svg" alt="menu" />
          </div>
        </div>
      </div>

      {/* Slide down menu (mobile only) */}
      <div className={`md:hidden rounded-md bg-gray-200 p-1 absolute transform transition-transform duration-500 ease-in-out ${slide ? '-translate-y-14' : '-translate-y-40'} left-0 w-full z-10`}>
        <div className='flex justify-between items-center px-4 py-2'>
          <nav className='flex gap-3'>
            <Link className='text-gray-600 font-semibold hover:underline' href="/">Home</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/#about">About</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/#contact">Contact</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/Menu">Menu</Link>
          </nav>

          <div className='flex justify-center items-center gap-2'>
            {status === 'authenticated' ? (
              <>
                {/* <Link className='text-gray-600 font-medium' href='/profile'>Hello,{userName}</Link> */}
                <button className='bg-primary px-3 py-1 text-white rounded-full text-xs font-semibold' onClick={() => signOut()}>Logout</button>
              </>
            ) : (
              <>
                <Link className='bg-primary px-3 py-1 text-white rounded-full text-xs font-semibold' href="/login">Login</Link>  
              </>
            )}
          </div>

          <div onClick={() => setSlide(false)} className='p-1'>
            <img className='w-8' src="/hamburggar.svg" alt="close" />
          </div>
        </div>


      </div>

      {/* Desktop */}
      <div className='hidden md:block'>
        <nav className='flex justify-between items-center'>
          <div className='flex gap-6 items-center'>
            <Link className='md:text-3xl text-2xl text-primary font-bold' href="/">Pizza 47</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/">Home</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/#about">About</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/#contact">Contact</Link>
            <Link className='text-gray-600 font-semibold hover:underline' href="/Menu">Menu</Link>
          </div>

          <div className='flex items-center gap-4'>
            {status === 'authenticated' ? (
              <>
                <Link className='text-gray-600 font-medium' href='/profile'>Hello, {userName}</Link>
                <button className='bg-primary px-4 py-2 text-white rounded-full text-xs font-semibold' onClick={() => signOut()}>Logout</button>
              </>
            ) : (
              <>
                <Link className='text-gray-600 font-semibold px-2' href="/login">Login</Link>
                <Link className='bg-primary px-4 py-2 text-white rounded-full text-xs font-semibold' href="/register">Register</Link>
              </>
            )}

            <Link href='/cart' className='relative'>
              <img className='w-6' src="/cart.svg" alt="cart" />
              {cartProduct.length > 0 && (
                <span className='text-xs text-white absolute -top-1 -right-2 bg-primary px-[5px] py-[2px] rounded-full leading-3 font-medium'>
                  {cartProduct.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Headar;
