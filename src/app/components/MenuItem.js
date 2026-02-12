import React, { useContext } from 'react'
import Image from 'next/image'
import { CartContext } from './SessionWrapper'
import toast from 'react-hot-toast'
import { useState } from 'react'
import Addtocartbutton from './Addtocartbutton'

const MenuItem = (menuitems) => {
    const { name, image, description, sizes, price, extraingredients } = menuitems
    const [showpopup, setshowpopup] = useState(false)
    const [selectedsize, setselectedsize] = useState(sizes?.[0] || null)
    const [selectExtras, setSelectExtras] = useState([])
    const { addToCart } = useContext(CartContext)
    const hasSizeorExtras = (sizes?.length > 0 || extraingredients?.length > 0);

    function handleExtraChange(ev, extrathing) {
        const checked = ev.target.checked;
        if (checked) {
            setSelectExtras(prev => [...prev, extrathing]);
        } else {
            setSelectExtras(prev => prev.filter(item => item.name !== extrathing.name));
        }
    }


    function HandleaddToCartButtonClick() {
        if (showpopup) {
            addToCart(menuitems, selectedsize, selectExtras)
            toast.success('Added to cart')
            setTimeout(() => {
                setshowpopup(false)
            }, 1000);
            return;
        }
        if (sizes.length === 0 && extraingredients.length === 0) {
            addToCart(menuitems)
            toast.success('Added to cart')
        }
        else {
            setshowpopup(true)
        }
    }

    let selectedprice = price;
    if (selectedsize) {
        selectedprice = selectedsize.price;
    }
    if (selectExtras?.length > 0) {
        for (const item of selectExtras) {
            selectedprice += item.price;
        }
    }

    return (
        <>
            {showpopup &&
                <div onClick={() => setshowpopup(false)} className='fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10'>

                    <div onClick={(ev) => ev.stopPropagation()} className='bg-white p-4 rounded-lg max-w-md overflow-y-scroll' style={{ maxHeight: 'calc(100vh - 100px)' }} >
                        <Image className='pizza mx-auto' src={image && image.length > 0 ? image : '/pngegg.png'} width={250} height={250} alt='pizza'></Image>
                        <h2 className='text-2xl font-bold text-center'>{name}</h2>
                        <p className='mt-1 text-sm text-gray-600 line-clamp-3 text-center'>{description}</p>

                        {sizes.length > 0 &&
                            <div className='bg-gray-200 rounded-md p-1'>
                                <h3 className='font-medium'>pick your size</h3>

                                {sizes.map((size, index) => (

                                    <label key={index} className='flex items-center gap-1 p-1 text-gray-600'>
                                        <input
                                            onChange={() => setselectedsize(size)}
                                            checked={selectedsize?.name === size.name}
                                            type="radio" name="size" className='' />
                                        {size.name} ${size.price}
                                    </label>
                                ))}
                            </div>
                        }

                        {extraingredients.length > 0 &&
                            <div className='bg-gray-200 rounded-md p-1 mt-1'>
                                <h3 className='font-medium'>Any extras?</h3>

                                {extraingredients.map((extrathing, index) => (
                                    <label key={index} className='flex items-center gap-1 p-1 text-gray-600'>
                                        <input
                                            onClick={(ev) => handleExtraChange(ev, extrathing)}
                                            type="checkbox" name={extrathing.name} className='' />
                                        {extrathing.name} +${extrathing.price}
                                    </label>
                                ))}
                            </div>
                        }

                        <div className='flex justify-center mt-2 sticky bottom-0 flex-col gap-1'>

                            <div onClick={() => HandleaddToCartButtonClick()}
                                className='bg-primary p-1 rounded-md text-white w-full font-bold sticky'>
                                <span>Add to cart ${selectedprice}</span>
                            </div>
                            <button onClick={() => setshowpopup(false)} className='border bg-white border-gray-500 w-full p-[2px] rounded-md text-gray-800'>Cancel</button>
                        </div>

                    </div>
                </div>
            }

            <div className='card bg-gray-200 text-center p-2 flex flex-col items-center rounded-lg hover:bg-white transition-all  hover:shadow-xl hover:shadow-black/25 '>
                <div className='md:h-[100px] '>
                    <Image className='pizza p-1 rounded-lg ' src={image && image.length > 0 ? image : '/pngegg.png'} width={160} height={160} alt='pizza'></Image>
                </div>
                <h2 className='text-lg font-bold'>{name}</h2>
                <p className='mt-1 text-sm text-gray-600 line-clamp-3'>{description}</p>

                <Addtocartbutton hasSizeorExtras={hasSizeorExtras} price={price} HandleaddToCartButtonClick={HandleaddToCartButtonClick} image={image} />
            </div>
        </>

    )
}

export default MenuItem
