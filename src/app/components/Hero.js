import React from 'react'
import Image from 'next/image'
const Hero = () => {
    return (
        <section className='flex justify-between mt-10 w-full '>
            <div className='w-1/2 py-4'>
                <h1 className='md:text-5xl text-4xl font-bold'>Everything <br /> is better <br /> with a<span className='text-primary'>Pizza</span> </h1>
                <p className='text-gray-500 md:text-lg mt-5 font-medium'>Order your favorite food from the comfort of your home Lorem ipsum dolor sit amet !</p>
                <div className='flex gap-3 mt-4'>
                    <button className='bg-primary md:text-base text-sm px-6 py-3 rounded-full flex items-center md:gap-3 gap-2 text-white font-medium text-nowrap'>Order Now <img className='w-5 pr-1 md:pr-0 ' src="/Right.svg" alt="" /></button>
                    <button className='md:text-lg font-medium hover:underline flex items-center gap-1 text-gray-600 text-nowrap'>Learn More <img className='w-5' src="/Right.svg" alt="" /></button>
                </div>
            </div>

            <div className='headimage'>
                <Image src={"/headpizza.png"} width={400} height={400} alt='pizza'></Image>
            </div>
        </section>
    )
}

export default Hero
